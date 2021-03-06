// jwt
const bcrypt = require('bcrypt')
const auth = require('../../../auth')
const TABLA = 'auth';

const error = require('../../../utils/error')

module.exports = function (injectedStore) {
    let store = injectedStore;
    console.log(injectedStore)
    // if (!store) {
    //     store = require('../../../store/dummy')
    // }
    // function list() {
    //     return store.list(TABLA)
    // }
    async function login(username, password) {
        const data = await store.query(TABLA, { username });
        console.log(data)
        return bcrypt.compare(password, data.password)
            .then((sonIguales) => {
                if (sonIguales) {
                    //generar token
                    console.log(auth.sign(data))
                    return auth.sign(data)
                } else {
                    throw error('Invalid Information', 401)
                    // throw new Error('Invalid Information')
                }
            })
        // if (data.password === password) {
        //     //generar token
        //     return auth.sign(data)
        // } else {
        //     throw new Error('Invalid Information')
        // }
    }
    async function upsert(data) {
        const { id, username, password } = data
        const authData = {
            id
        }
        // si viene un id lo usaremos, en caso contrario lo generaremos
        if (username) {
            authData.username = username;
        }
        if (password) {
            authData.password = await bcrypt.hash(password, 5);
        }
        return store.upsert(TABLA, authData)
    }
    return {
        upsert,
        login
    }
}
