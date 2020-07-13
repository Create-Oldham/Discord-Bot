module.exports = {
    addUserLink: (client, message, sql, config, admin) => {
        const splitMessage = message.content.split(' ')
        if (message.guild !== null) {
            if (message.member.roles.cache.some(r => r.name === config.inductorRole)) {
                console.log("Add new induction")
                var searchTermRaw = "";
                console.log(splitMessage);
                for (i = 2; i < splitMessage.length; i++) {
                    searchTermRaw = searchTermRaw + splitMessage[i] + " ";
                }

                var searchTerm = searchTermRaw.trim();
                if (searchTerm !== '') {

                    const args = splitMessage[1];
                    if (args) {
                        const user = require("../utils/discordUtils.js").getUserFromMention(client, args);
                        if (!user) {
                            return message.reply('Please use a proper mention if you want to add someone to a piece of equipment');
                        } else {
                            sql.connect()
                                .then((conn) => {
                                    new sql.command('EquipmentLink_ins', conn)
                                        .then((command) => {
                                            command.input('SearchTerm', sql.sqlType.VarChar(50), searchTerm);
                                            command.input('DiscordID', sql.sqlType.VarChar(25), user.id);
                                            command.input('Admin', sql.sqlType.TinyInt, admin);
                                            command.input('UID', sql.sqlType.VarChar(25), message.author.id);

                                            command.RunQuery()
                                                .then((result) => {
                                                    var resultOutcome = result.recordset[0].result;
                                                    console.log(resultOutcome)
                                                    if (resultOutcome.toLowerCase() === "success") {
                                                        if (admin === 1) {
                                                            message.reply("Added " + '<@' + user.id + '>' + " to the machine as an inductor")

                                                        } else {
                                                            message.reply("Added " + '<@' + user.id + '>' + " to the machine ")
                                                        }
                                                    } else if (resultOutcome.toLowerCase() === "exists") {
                                                        message.reply('<@' + user.id + '>' + " already exists with a link to " + searchTerm);

                                                    } else if (resultOutcome.toLowerCase() === "failiure") {
                                                        message.reply("Permissions Issue")
                                                        console.log(message.author.id);
                                                    } else if (resultOutcome.toLowerCase() === "invalid") {
                                                        message.reply("The search term " + searchTerm + " returned no results, use !Equipment to get a list of potential equipment names")
                                                        console.log(message.author.id);
                                                    } else {
                                                        message.reply("Failiure due to unknown reason")
                                                    }
                                                })
                                                .catch((err) => sql.responseError(err, 'run query'));
                                        })
                                        .catch((err) => sql.responseError(err, 'command'));
                                })
                                .catch((err) => sql.responseError(err, 'connection'));
                        }
                    }
                } else {
                    message.reply("You don't have a role that allows adding induction privledges")
                }
            } else {
                message.reply("Please enter a search term")
            }
        } else {
            message.author.send("Please send this message in a channel on the Create Oldham Server")
        }
    }
}