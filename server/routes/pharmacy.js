const express = require('express');
const router = express.Router();

const pool = require('../database/Connection').pool;

/**
 * Fetch all the pharmacies which support our web app.
 */
router.route('/pharmacy').post((req, res, next) => {
    pool.getConnection(function(err, conn) {
        if (err)
            throw err;
        conn.query("SELECT user_mail,business_name,busin_addr,busin_city,busin_state,busin_zip,busin_phone,location_latitude,location_longitude FROM wholesale_users_table WHERE business_type = 'Pharmacy' AND location_latitude != 'No Lat'",
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