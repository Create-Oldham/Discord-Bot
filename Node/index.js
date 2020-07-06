const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('./config.json');



client.login(config.token);

client.on('message', message => {
    console.log(message.content);

    let member = message.member;

    if (message.content === '!ping') {
        // send back "Pong." to the channel the message was sent in

        message.channel.send('Pong.');
    } else {
    }

});

// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
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
});


client.on('guildMemberAdd', member => {
    // To compare, we need to load the current invite list.
    member.guild.fetchInvites().then(guildInvites => {
        // This is the *existing* invites for the guild.
        const ei = invites[member.guild.id];
        // Update the cached invites for the guild.
        invites[member.guild.id] = guildInvites;
        // Look through the invites, find the one for which the uses went up.
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        // Get the log channel (change to your liking)
        const logChannel = member.guild.channels.cache.find(channel => channel.name === "testing");
        // A real basic message with the information we need. 
        logChannel.send(`${member.user.tag} joined using invite code ${invite.code} Invite was used ${invite.uses} times since its creation.`);

        if (invite.code === config.memberInvite) {
            console.log("He's a member!")
            let role = member.guild.roles.cache.find(r => r.name === "Test");



            // Add the role!
            member.roles.add(role).catch(console.error);

        }
    });
});


