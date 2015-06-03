/**
 * Development database configuration file
 */
var db_hostname = process.env.DB_PORT_3306_TCP_ADDR,
        db_username = process.env.DB_USERNAME,
        db_password = process.env.DB_PASSWORD,
        db_database = process.env.DB_DATABASE;


module.exports.db = {
    host: db_hostname === undefined ? '127.0.0.1' : db_hostname,
    user: db_username === undefined ? 'root' : db_username,
    password: db_password === undefined ? '' : db_password,
    database: db_database === undefined ? 'reminder' : db_database
}
