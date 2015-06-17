/**
 * Docker database configuration file
 */
var db_host = '172.17.42.1',
        db_port = '3306',
        db_username = 'reminder',
        db_password = '1R29mBzu3uG08RnJtpI6';


module.exports.db = {
    host: db_host,
    port: db_port,
    user: db_username,
    password: db_password,
    database: 'reminder'
}
