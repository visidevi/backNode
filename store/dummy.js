// aquí vamos a  guardar todo el almacenamiento
const db = {
    'user': [
    ]
};
// normal
// function list(table) {
//     return db[table]
// };
// async
// cuando seteamos async  lo convertimos en una promesa
async function list(table) {
    return db[table]  || [];
};

// Aislar el código de la base de datos
async function get(table, id) {
    let collection = await list(table)
    return collection.filter(item => item.id === id[0] || null)
};
// opcion 1

async function upsert(table, data) {
   if (!db[table]) {
    db[table] = [];
   }
   db[table].push(data);
//    console.log(db)
};

// opcion 2
async function remove(table, id) {
    // devolver una nueva promesa
    // return new Promise(res, req, )
    return true
};

async function query(table, params) {
    // const { username } = params;
    let collection = await list(table)
    let keys  = Object.keys(params);
    let key  = keys[0]
    return collection.filter(item => item[key] === params[key])[0] || null;
    // return collection.filter(item => item.username === username[0] || null)
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
}
