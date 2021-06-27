const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/**
 * Send the email to Medpick with the message the user typed in the "contact us" page.
 */
router.route('/contact_us').post((req, res, next) => {
    emailSender(req.body.name, req.body.phone, req.body.message).catch(console.error);
    res.json({success: true});
});

//send email
async function emailSender(name, phoneNumber, message) {
    
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
        html: '<html>' + name + ' has sent a message from Pinaka Web App! Please take a look! <br> PhoneNumber: ' + phoneNumber + '<br> Message: ' + message + '</html>'
    });

    console.log('Email sent successfully');
 
}

module.exports = router;