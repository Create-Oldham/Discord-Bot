module.exports = {
    pointAdd: (client, message, sql) => {

        const splitMessage = message.content.split(' ')
        if (message.guild !== null) {
            const args = splitMessage[0];
            if (args) {
                const user = require("../utils/discordUtils.js").getUserFromMention(client, args);
                if (!user) {
                    return message.reply('Please use a proper mention at the start of the message if you want to add someone to plusplus');
                } else {
                    sql.connect()
                        .then((conn) => {
                            new sql.command('pointAdd', conn)
                                .then((command) => {
                                    command.input('DiscordID', sql.sqlType.VarChar(25), user.id);
                                    command.RunQuery()
                                        .then((result) => {
                                            var currentPoints = result.recordset[0].currentPoints;
                                            if (currentPoints !== null) {
                                                message.reply("Congratulations " + '<@' + user.id + '>' + " you now have " + currentPoints + " points")
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
            message.author.send("Please send this message in a channel on the Create Oldham Server")
        }
    },

    pointClear: (client, message, sql, config) => {
        if (message.member.roles.cache.some(r => r.name === config.plusplus.pointsClearRoles)) {

            const splitMessage = message.content.split(' ')
            if (message.guild !== null) {
                const args = splitMessage[1];
                if (args) {
                    const user = require("../utils/discordUtils.js").getUserFromMention(client, args);
                    if (!user) {
                        return message.reply('Please use a proper mention if you want to add someone to plusplus');
                    } else {
                        sql.connect()
                            .then((conn) => {
                                new sql.command('pointClear', conn)
                                    .then((command) => {
                                        command.input('DiscordID', sql.sqlType.VarChar(25), user.id);
                                        command.RunQuery()
                                            .then((result) => {
                                                var currentPoints = result.recordset[0].currentPoints;
                                                if (currentPoints !== null) {
                                                    message.reply("Cleared points for " + '<@' + user.id + '>')
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
                message.author.send("Please send this message in a channel on the Create Oldham Server")
            }
        } else {
            message.reply("You don't have permission to clear points")
        }
    },
    pointCheck: (client, message, sql, config) => {


        const splitMessage = message.content.split(' ')
        var args = ""
        if (message.guild !== null) {
            console.log("1")
            if (splitMessage.length > 1) {
                args = splitMessage[1];

            } else {
                args = null
            }
            if (args !== null) {
                const user = require("../utils/discordUtils.js").getUserFromMention(client, args);
                if (!user) {
                    return message.reply('Please use a proper mention if you want to check someones points');
                } else {
                    sql.connect()
                        .then((conn) => {
                            new sql.command('pointCheck', conn)
                                .then((command) => {
                                    command.input('DiscordID', sql.sqlType.VarChar(25), user.id);
                                    command.RunQuery()
                                        .then((result) => {
                                            var currentPoints = result.recordset[0].currentPoints;
                                            if (currentPoints !== null) {
                                                message.channel.send("Cleared points for " + '<@' + user.id + '>')
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
            } else {
                sql.connect()
                    .then((conn) => {
                        new sql.command('pointCheck', conn)
                            .then((command) => {
                                command.input('DiscordID', sql.sqlType.VarChar(25), message.author.id);
                                command.RunQuery()
                                    .then((result) => {
                                        var currentPoints = result.recordset[0].currentPoints;
                                        if (currentPoints !== null) {
                                            message.channel.send('<@' + message.author.id + '> has ' + currentPoints + ' points')
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

        } else {
            message.author.send("Please send this message in a channel on the Create Oldham Server")
        }

    }, leaderboard: (client, message, sql, config) => {

        var output = "The current leaderboard standing is: \n";

        sql.connect()
            .then((conn) => {
                new sql.command('Leaderboard', conn)
                    .then((command) => {
                        command.RunQuery()
                            .then((result) => {
                                console.log(result)

                                result = result.recordset;
                                for (i = 0; i < result.length; i++) {
                                    var userid = result[i].userid;
                                    var points = result[i].points;

                                    output = output + "*" + '<@' + userid + '>' + "*" + " - " + points + " points" + "\n";
                                }
                                message.channel.send(output)
                            })
                            .catch((err) => sql.responseError(err, 'run query'));
                    })
                    .catch((err) => sql.responseError(err, 'command'));
            })
            .catch((err) => sql.responseError(err, 'connection'));
        console.log(output)

    }
}