const express = require('express');
const router = express.Router();

const pool = require('../database/Connection').pool;

/**
 * Fetch orders the user has submitted before from the database.
 */
router.route('/my_orders').post((req, res, next) => {
    pool.getConnection(function(err, conn) {
        if (err)
            throw err;
        conn.query("SELECT * FROM prescription_order_consumer WHERE customer_id = ?", [req.body.customer_id],
            function (err, results, fields) {
                if (err)
                    throw err;
                else {
                    console.log('Selected ' + results.length + ' row(s).');
                    res.json(results); //object as parameter
                }
                for (i = 0; i < results.length; i++) {
                    console.log('Row: ' + JSON.stringify(results[i]));
                }
                console.log('Done.');
            })
        conn.release();
    })
})

module.exports = router;