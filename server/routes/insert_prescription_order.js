const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const pool = require('../database/Connection').pool;

/* mail */
const nodemailer = require('nodemailer');

/* firebase cloud messaging notification */

const admin = require("firebase-admin");
const serviceAccount = require("../pinaka-290804-firebase-adminsdk-vaq6f-a50107820e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pinaka-290804.firebaseio.com"
});

//prescription preprocessing
let file_url = null;
const host = 'http://localhost:5000/medpickprescription/'; // host + /medpickprescription/


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./medpickprescription/presimages")
    }, //"presimages/"
    filename: function(req, file, cb) {
        cb(null, req.body.prescription_order_no + ".jpeg");
        file_url = host + 'presimages/' + req.body.prescription_order_no + ".jpeg";
    }
});

const upload = multer({
    storage: storage,
}).single('file');


/**
 * Insert an order to the database and 
 * send email and FCM to the pharmacy which the customer chose.
 */
router.route('/insert_prescription_order').post((req, res, next) => {            
    upload(req, res, function (err) {
        if (err)
            console.log(err);
    }); 

    pool.getConnection(function(err, conn) {
        if (err)
            throw err;
        conn.query("INSERT INTO prescription_order_consumer(prescription_order_no,customer_id,customer_name,customer_email,customer_phone,presc_image,order_date,order_time,token_no,pharm_name,pharm_email,pharm_phone,pharm_addr,order_status,reason_for) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,'Processing','No Reason')",
            [req.body.prescription_order_no, req.body.customer_id, req.body.customer_name, req.body.customer_email, req.body.customer_phone, file_url, req.body.order_date, req.body.order_time, req.body.token_no, req.body.pharm_name, req.body.pharm_email, req.body.pharm_phone, req.body.pharm_addr],
            function (err, results, fields) {
                if (err) 
                    throw err;
                    //res.json({isSuccess: false});
                else {
                    console.log('Inserted ' + results.affectedRows + ' row(s).');

                    //send email
                    //test if nodemailer is working
                    emailSender(req.body.pharm_email, req.body.prescription_order_no).catch(console.error);

                    conn.query("SELECT user_token FROM wholesale_users_table WHERE user_mail = ?",
                        [req.body.pharm_email],
                        function (err, results, fields) {
                            if (err)
                                throw err;
                            else {
                                console.log('Selected ' + results.length + ' row(s).');
                                res.json({isSuccess: true}); //object as parameter

                                if (results.length > 0) {
                                    let pharm_token = {
                                        user_token: ''
                                    };

                                    pharm_token = results[0];
                                    
                                    //Un-comment this part for sent FCM message to the pharmacy
                                    //send notification
                                    
                                    admin.messaging().sendToDevice(pharm_token.user_token, payload, options)
                                        .then(res => {
                                            console.log("Successfully sent message:", res);
                                            //console.log(res.results[0].error);
                                        })
                                        .catch(error => {
                                            console.log("Error sending message:", error);
                                        });
                                    
                                }
                                
                                
                                

                            }
                            for (i = 0; i < results.length; i++) {
                                console.log('Row: ' + JSON.stringify(results[i]));
                            }
                            console.log('Done.');
                        })
                }
            })
        conn.release();
    })

})

//send email
async function emailSender(emailAddress, fileName) {
    
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'pinakaproject7@gmail.com',
            pass: 'pinakacs682'
        }
    });

    let mailOptions = await transport.sendMail({
        from: 'pinakaproject7@gmail.com',
        to: emailAddress,
        //cc: "meganathan@medpick.in",
        subject: 'Pinaka Mailer Testing',
        html: '<html>Dear Pharmacist,<br> Medpick customer Placed a prescription order in your pharmacy.Please check Medpick Wholesale App</html>',
        attachments: [{
            filename: fileName + ".jpeg",
            path: './medpickprescription/presimages/' + fileName + ".jpeg"
        }]
    });

    console.log('Email sent successfully');
 
}

//send notification
//change token to pharmacy's token

const title = "Medpick Wholesale Team";
const notification = "One Customer Placed a order. please check Medpick Wholesale app";

const payload = {
    notification: {
        title: title,
        body: notification,
    }
};

const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
};






module.exports = router;