const express = require('express');
const router = express.Router();

const pool = require('../database/Connection').pool;

/**
 * Insert a new user to the database.
 */
router.route('/signup').post((req, res, next) => {
    pool.getConnection(function(err, conn) {
        if (err)
            throw err;
        conn.query("INSERT INTO prescription_customer_details (customer_id, customer_name, customer_email, customer_phone, customer_password, custom_token) VALUES (?, ?, ?, ?, ?, ?);", 
            [req.body.customer_id, req.body.customer_name, req.body.customer_email, req.body.customer_phone, req.body.customer_password, req.body.customer_token], 
            function (err, results, fields) {
                if (err) 
                    throw err;
                else {
                    console.log('Inserted ' + results.affectedRows + ' row(s).');
                    res.json({isSuccess: true});
                }
            })
        conn.release();
    })
})

module.exports = router;