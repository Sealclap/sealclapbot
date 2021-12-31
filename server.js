require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    options: { debug: true },
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_TOKEN
	},
	channels: [ 'sealclap', 'schwamgames' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
	console.log(`${tags['display-name']}: ${message}`);

    if(message.toLowerCase() === 'hello' || message.toLowerCase() === 'hey' || message.toLowerCase() === 'hi') {
        client.say(channel, `Hey there, @${tags.username}!`);
    };

    if(tags.username === 'buttsbot' && message.toLowerCase() !== ':d') {
        client.say(channel, 'Buttsbot yes');
    };
	
    if(message === 'DEATH COUNT: 100 eelguyNO eelguyFAIL') {
	client.say(channel, '@SchwamGames has died 100 times? And we all really just sat here and watched? #worthit');
    };

    if(self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if(command.toLowerCase() === 'echo' && tags.username !== 'sealclap') {
	client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
    };
	
    if(command.toLowerCase() === 'echo' && tags.username === 'sealclap') {
	client.say(channel, `${args.join(' ')}`);
    };

    if(command.toLowerCase() === 'casey') {
	client.say(channel, `@casey_robbitz is a big cutie!`);
    };
	
    if(command.toLowerCase() === 'hully') {
	client.say(channel, `@HullyGee is a big cutie!`);
    };
	
    if(command.toLowerCase() === 'baldheadedfuck') {
	client.say(channel, `@Sealclap is a bald headed fuck.`);
    };

    if(command.toLowerCase() === 'hundred') {
	client.say(channel, `@SchwamGames has died 100 times! Can you believe it?!`);
    };
});
