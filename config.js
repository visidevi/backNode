module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret:  process.env.JWT_SECRET || 'SECRETO'
    },
    mysql: {
        host:  process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || '',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || '',
        port: process.env.MYSQL_SRV_PORT || '',
    }
}
