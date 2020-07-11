module.exports = { resetCache:(sql,client,config)  => {
    var membersInDatabase
    const listOfUsers = client.guilds.cache.get("689500677252186152")

    var listOfUserID = [];
    listOfUsers.members.cache.forEach(m => {

        if (m.roles.cache.some(r => r.name === config.memberRole)) {
        listOfUserID.push(m.id);
        }

    })
    var membersInDatabase = [];

    sql.connect()
        .then((conn) => {
            new sql.command('Users_sel', conn)
                .then((command) => {
                    command.RunQuery()
                        .then((result) => {
                            membersInDatabase = [];

                            result.recordset.forEach(m => {
                                membersInDatabase.push(m.DiscordID)
                            })
                            if (result.recordset.length >= 1) {
                                listOfUserID.forEach(m => {
                                    if (!membersInDatabase.includes(m)) {
                                        sql.connect()
                                            .then((conn) => {
                                                new sql.command('Users_ups', conn)
                                                    .then((command) => {
                                                        command.input('DiscordID', sql.sqlType.VarChar(25), m);
                                                        command.input('Admin', sql.sqlType.TinyInt, 0);
                                                        command.RunQuery()
                                                            .then((result) => {
                                                                console.log('Sucessfully added to database');
                                                            })
                                                            .catch((err) => sql.responseError(err, 'run query'));
                                                    })
                                                    .catch((err) => sql.responseError(err, 'command'));
                                            })
                                            .catch((err) => sql.responseError(err, 'connection'));
                                    }
                                })

                            } else {
                                return
                            }
                        })
                        .catch((err) => sql.responseError(err, 'run query'));
                })
                .catch((err) => sql.responseError(err, 'command'));
        })
        .catch((err) => sql.responseError(err, 'connection'));
}
}