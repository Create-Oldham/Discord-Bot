module.exports = {
    equipmentList: (sql,message) => {
        var output = "The current items available to add users to are: \n";

        sql.connect()
            .then((conn) => {
                new sql.command('Equipment_sel', conn)
                    .then((command) => {
                        command.RunQuery()
                            .then((result) => {
                             result = result.recordset[0];
                                console.log(result)
                                var name = result.EquipmentName;
                                output = output + "*"+name+ "*" + "\n";
                                message.reply(output)
                            })
                            .catch((err) => sql.responseError(err, 'run query'));
                    })
                    .catch((err) => sql.responseError(err, 'command'));
            })
            .catch((err) => sql.responseError(err, 'connection'));
            console.log(output)
    }
}
