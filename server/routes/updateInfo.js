const express = require('express');
const router = express.Router();

const pool = require('../database/Connection').pool;

/**
 * Update users information according to what they changed in the "my account" page. 
 */
router.route('/updateInfo').post((req, res, next) => {
    pool.getConnection(function(err, conn) {
        if (err) 
            throw err;
        conn.query('UPDATE prescription_customer_details SET customer_name = ?, customer_phone = ? WHERE customer_id = ?', 
            [req.body.customer_name, req.body.customer_phone, req.body.customer_id], 
            function (err, results, fields) {
                if (err)
                    throw err;
                else {
                    console.log('Updated ' + results.affectedRows + ' row(s).');
                    res.json({ isSuccess: true });
                }
                console.log('Done.');
            })
        conn.release();
    })
})

module.exports = router;