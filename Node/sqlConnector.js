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
        const request = pool1.request(); // or: new sql.Request(pool1)
        const result = await request.query('select 1 as number')
        console.dir(result)
        console.log(result.recordset[0].number)
        return result;
    } catch (err) {
        console.error('SQL error', err);
    }
}

messageHandler();

// promise style:
const pool2 = new sql.ConnectionPool(config)
const pool2Connect = pool2.connect()

pool2.on('error', err => {
    console.log(err);
})

function runStoredProcedure() {
    return pool2Connect.then((pool) => {
        pool.request() // or: new sql.Request(pool2)
            .input('input_parameter', sql.Int, 10)
            .output('output_parameter', sql.VarChar(50))
            .execute('procedure_name', (err, result) => {
                // ... error checks
                console.dir(result)
            })
    }).catch(err => {
        // ... error handler
    })
}