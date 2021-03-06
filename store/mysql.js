const mysql = require('mysql');

const config = require('../config');

const { host, user, password, database } = config.mysql

const dbconf = {
    host,
    user,
    password,
    database,
}
// Connect!
let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);
    connection.connect((err) => {
        if (err) {
            console.error('[db-err]', err);
            setTimeout(handleCon, 2000)
        } else {
            console.log('DB Connected!')
        }
    });

    connection.on('error', err => {
        console.error('[db-err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    });
}
function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ID=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    });
}
function insert(table, data) {
    const post = {
        id: data.id,
        text: data.text,
        user: data.user,
    }
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, post, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}
function update(table, data) {
    const post = {
        id: data.id,
        text: data.text,
        user: data.user,
    }
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=? `, [post, post.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}
function upsert(table, data) {
    if (data && data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query,
}
// nodemon api/index.js
