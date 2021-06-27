const mysql = require('mysql');

/**
 * Create a connection pooling. 
 */
const pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: 'db4free.net',
    user: 'samddd6718',
    password: 'L134kira',
    database: 'pinakatestserver'
});

exports.pool = pool;
