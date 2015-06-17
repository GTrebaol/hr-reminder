/**
 * Production database configuration file
 */
var db_host = process.env.OPENSHIFT_MYSQL_DB_HOST,
        db_port = process.env.OPENSHIFT_MYSQL_DB_PORT,
        db_username = process.env.OPENSHIFT_MYSQL_DB_USERNAME,
        db_password = process.env.OPENSHIFT_MYSQL_DB_PASSWORD;


module.exports.db = {
    host: db_host === undefined ? '127.3.68.130' : db_host,
    port: db_port === undefined ? '3306' : db_port,
    user: db_username === undefined ? 'adminuaAUVZW' : db_username,
    password: db_password === undefined ? '_FsNvpHAXZvd' : db_password,
    database: 'reminder'
};

