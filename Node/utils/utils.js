const config = require('../config'),
    sql = require('mssql');

    var sqlConfig = config.sqlConfig;

module.exports = {
    sql: sql,
    sqlType: sql.TYPES,
    connect: (database = sqlConfig) => {
        return new sql.ConnectionPool(database).connect();
    },
    command: class command {
        constructor(sproc, pool) {
            return new Promise((resolve, reject) => {
                try {
                    this.sproc = sproc;
                    this.qry = new sql.Request(pool);
                    resolve(this);
                } catch (error) {
                    reject(error);
                }
            });
        }
        input(name, type, value) {
            this.qry.input(name, type, value);
        }
        RunQuery() {
            return this.qry.execute(this.sproc);
        }
    },

    
 responseError: (err, msg) => {
    console.error(`error: ${err}`);
}
};

