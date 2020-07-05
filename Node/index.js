const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login('');

client.on('message', message => {
    console.log(message.content);
    const role = message.guild.roles.cache.find(role => role.name === 'Test');
    
    let member = message.member;

    if (message.content === '!ping') {
        // send back "Pong." to the channel the message was sent in
        member.roles.add(role);

        message.channel.send('Pong.');
    } else {
        member.roles.remove(role);
    }

});
