const express = require('express');
const router = express.Router();

const pool = require('../database/Connection').pool;

/**
 * Update the FCM token when login to our web app.
 * Fetch user information from database for other purpose in our web app.
 */
router.route('/userDetail').post((req, res, next) => {
    pool.getConnection(function(err, conn) {
        if (err) 
            throw err;
        conn.query('UPDATE prescription_customer_details SET custom_token = ? ,customer_password = ? WHERE customer_id = ?', [req.body.customer_token, req.body.customer_password, req.body.customer_id], 
            function (err, results, fields) {
                if (err)
                    throw err;
                else {
                    console.log('Updated ' + results.affectedRows + ' row(s).');

                    conn.query("SELECT customer_name,customer_email,customer_phone FROM prescription_customer_details WHERE customer_id = ?", [req.body.customer_id],
                        function (err, results, fields) {
                            if (err)
                                throw err;
                            else {
                                console.log('Selected ' + results.length + ' row(s).');
                                res.json(results[0]); //object as parameter
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

module.exports = router;