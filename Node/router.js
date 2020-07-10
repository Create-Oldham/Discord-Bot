const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('./config.json');
var sql = require('./utils.js')


client.login(config.botToken);

client.on('message', message => {

    console.log(message.content);

    let member = message.member;
    console.log(member.id);

    if (message.content === '!ping') {
        // send back "Pong." to the channel the message was sent in

        message.channel.send('Pong.');
    } else if
        (message.content === '!cache') {
        //reset the cache for the members
        resetCache()

    }
    else {



    }

});

// Initialize the invite cache
const invites = {};

// Create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
    // "ready" isn't really ready. We need to wait a spell.
    wait(1000);
    console.log("Ready!")
    // Load all invites for all guilds and save them to the cache.
    client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });


    resetCache()

});

function resetCache() {
    var membersInDatabase
    const listOfUsers = client.guilds.cache.get("689500677252186152");

    var listOfUserID = [];
    listOfUsers.members.cache.forEach(m => {
        listOfUserID.push(m.id);
    })
    var membersInDatabase = [];

    console.log(listOfUserID)

    sql.connect()
        .then((conn) => {
            new sql.command('Users_sel', conn)
                .then((command) => {
                    command.RunQuery()
                        .then((result) => {
                            membersInDatabase = [];
                            console.log("1");

                            result.recordset.forEach(m => {
                                console.log(m)
                                membersInDatabase.push(m.DiscordID)
                            })

                            console.log(membersInDatabase)
                            if (result.recordset.length > 1) {
                                listOfUserID.forEach(m => {
                                    console.log(membersInDatabase.includes(m))
                                    if (!membersInDatabase.includes(m)) {
                                        sql.connect()
                                            .then((conn) => {
                                                new sql.command('Users_ups', conn)
                                                    .then((command) => {
                                                        command.input('DiscordID', sql.sqlType.VarChar(25), m);
                                                        command.input('Admin', sql.sqlType.TinyInt, 0);
                                                        console.log("2")
                                                        command.RunQuery()
                                                            .then((result) => {
                                                                console.log('Sucessfully added to database');
                                                            })
                                                            .catch((err) => responseError(err, 'run query'));
                                                    })
                                                    .catch((err) => responseError(err, 'command'));
                                            })
                                            .catch((err) => responseError(err, 'connection'));
                                    }
                                })

                            } else {
                                console.log("blah")
                            }
                        })
                        .catch((err) => responseError(err, 'run query'));
                })
                .catch((err) => responseError(err, 'command'));
        })
        .catch((err) => responseError(err, 'connection'));
}

client.on('guildMemberAdd', member => {
    const logChannel = member.guild.channels.cache.find(channel => channel.name === "testing");

    console.log(member.id);
    // To compare, we need to load the current invite list.
    member.guild.fetchInvites().then(guildInvites => {
        // This is the *existing* invites for the guild.
        const ei = invites[member.guild.id];
        // Update the cached invites for the guild.
        invites[member.guild.id] = guildInvites;
        // Look through the invites, find the one for which the uses went up.
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        // Get the log channel (change to your liking)
        // A real basic message with the information we need. 
        for (i = 0; i < config.inviteTokens.length; i++) {
            if (invite.code === config.inviteTokens[i].token) {
                console.log("Joined using code " + config.inviteTokens[i].token + " assigned role " + config.inviteTokens[i].role)
                let role = member.guild.roles.cache.find(r => r.name === config.inviteTokens[i].role);

                // Add the role!
                member.roles.add(role).catch(console.error);

            }
        }

    });


});

const responseError = (err, msg) => {
    console.error(`error: ${err}`);
}


