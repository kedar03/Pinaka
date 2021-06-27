const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const pool = require('../database/Connection').pool;

/**
 * Insert a data corresponding to the user who requests for pharmacies by their location.
 * 
 * If the user requests for the nearest medbox, send email to Medpick with their location and user information.
 */
router.route('/request_pharmacy_by_your_location').post((req, res, next) => {
    pool.getConnection(function(err, conn) {
        if (err)
            throw err;
        conn.query("INSERT INTO medpick_pharmacy_requests(customer_name,customer_email,customer_phone,glatitude,glongitude,request_for, date) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [req.body.customer_name, req.body.customer_email, req.body.customer_phone, req.body.glatitude, req.body.glongitude, req.body.request_for, req.body.date], 
            function (err, results, fields) {
                if (err) 
                    throw err;
                    //res.json({isSuccess: false});
                else {
                    console.log('Inserted ' + results.affectedRows + ' row(s).');
                    res.json({isSuccess: true});

                    if (req.body.request_for === "Medbox") {
                        //send email
                        emailSender(req.body.customer_name, req.body.customer_phone, req.body.customer_email, req.body.glatitude, req.body.glongitude, req.body.city).catch(console.error);
                    }
                }
            })
        conn.release();
    })
})

//send email
async function emailSender(name, phoneNumber, email, lat, lng, city) {
    
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
        to: 'pinakaproject7@gmail.com',
        //to: 'pinakaproject7@gmail.com',
        subject: 'Pinaka Mailer Testing',
        html: '<html>' + name + ' has requested a medbox!<br> PhoneNumber: ' + phoneNumber + '<br> Email: ' + email + '<br> city: ' + city + '<br> lat: ' + lat + '<br> lng: ' + lng + '</html>'
    });

    console.log('Email sent successfully');
 
}

module.exports = router;