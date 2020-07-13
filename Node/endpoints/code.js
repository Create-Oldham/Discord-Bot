module.exports = {
    code: (client, message, sql, config) => {
        const splitMessage = message.content.split(' ')

        var searchTermRaw = "";
        console.log(splitMessage);
        for (i = 1; i < splitMessage.length; i++) {
            searchTermRaw = searchTermRaw + splitMessage[i] + " ";
        }

        var searchTerm = searchTermRaw.trim();

        if(searchTerm !== ''){
        sql.connect()
            .then((conn) => {
                new sql.command('CodeGet', conn)
                    .then((command) => {
                        command.input('SearchTerm', sql.sqlType.VarChar(50), searchTerm);
                        command.input('DiscordID', sql.sqlType.VarChar(25), message.member.id);


                        command.RunQuery()
                            .then((result) => {
                                var resultOutcome = result.recordset[0].result;
                                console.log(resultOutcome)
                                if (resultOutcome.toLowerCase() === "success") {
                                    message.reply("*" + result.recordset[1].EquipmentName + "* \n" + result.recordset[1].EquipmentInstructions)
                                } else if (resultOutcome.toLowerCase() === "failiure") {
                                    message.reply("You don't have permission to view the code for this machine")
                                    console.log(message.member.id);
                                } else if (resultOutcome.toLowerCase() === "invalid") {
                                    message.reply("The search term" + searchTerm + " returned no results, use !Equipment to get a list of potential equipment names ")
                                    console.log(message.member.id);
                                } else {
                                    message.reply("Failiure due to unknown reason")
                                }
                            })
                            .catch((err) => sql.responseError(err, 'run query'));
                    })
                    .catch((err) => sql.responseError(err, 'command'));
            })
            .catch((err) => sql.responseError(err, 'connection'));
        } else {
            message.reply("Please enter a search term")
        }
    }
}

