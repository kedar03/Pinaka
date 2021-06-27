const express = require('express');
const router = express.Router();

const pool = require('../database/Connection').pool;

/**
 * Fetch the links and images from the dashboard's database.
 */
router.route('/dashboard').post((req, res, next) => {
    pool.getConnection(function(err, conn) {
        if (err)
            throw err;
        conn.query("SELECT * FROM pinaka_dashboard WHERE secret_word = ? ", [req.body.secret_word], 
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
        conn.release();
    })
})

module.exports = router;