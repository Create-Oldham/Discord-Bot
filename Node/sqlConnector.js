const sql = require('mssql')
var configFile = require('./config.json');

var config = configFile.sqlConfig;

// async/await style:
const pool1 = new sql.ConnectionPool(config);
const pool1Connect = pool1.connect();

pool1.on('error', err => {
    console.log(err);
})

async function messageHandler() {
    await pool1Connect; // ensures that the pool has been created
    try {
        const request = pool1.request();
        const result = await request.query('equipment_sel')
        console.dir(result)
        console.log(result.recordset[0])
        return result;
    } catch (err) {
        console.error('SQL error', err);
    }
}

messageHandler();

async function addUser() {
    await pool1Connect; // ensures that the pool has been created
    try {
        const request = pool1.request();
        const result = await request.query('')
        console.dir(result)
        console.log(result.recordset[0])
        return result;
    } catch (err) {
        console.error('SQL error', err);
    }
}

