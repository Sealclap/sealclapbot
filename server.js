import dotenv from 'dotenv';
dotenv.config();
import tmi from 'tmi.js';
import fetch from 'node-fetch';
import { arg, index } from 'mathjs';

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    options: { debug: true },
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_TOKEN
	},
	channels: [ 'sealclap' ]
});

client.connect();
console.log(`server.js connected to ${client.opts.channels.join(', ')}`);

client.on('connected', (address, port) => {
	if(twitchPlaysLive) {
		setInterval(timedMessage, 600000)
		function timedMessage() {
			client.say('sealclap', `This game is now interactive! Type '!play' to see the list of commands or type '!chances' to see the likelihood of each command!`);
		};
	};
});

async function fetchTextApi(url) {
	const response = await fetch(url);
	const data = await response.text();
	return data;
};

async function fetchJsonApi(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

// For TwitchPlays integration -- Just change .env variable
var twitchPlaysLive = false;
const playCommands = process.env.PHASPLAY.split(', ');
const randomCommands = process.env.PHASCOMMANDS.split(', ');
const twentyPercent = process.env.PHASTWENTY.split(', ');
const tenPercent = process.env.PHASTEN.split(', ');
const fivePercent = process.env.PHASFIVE.split(', ');
const twoPercent = process.env.PHASTWO.split(', ');
const pointOnePercent = process.env.PHASPOINTONE.split(', ');

client.on('message', (channel, tags, message, self) => {

	const isMod = tags.mod || tags['user-type'] === 'mod';
	const isBroadcaster = channel.slice(1) === tags.username;
	const isModUp = isMod || isBroadcaster;
	const myChannel = channel.slice(1) === process.env.MY_CHANNEL;

    if((message.toLowerCase() === 'hello' || message.toLowerCase() === 'hey' || message.toLowerCase() === 'hi') && myChannel) {
        client.say(channel, `Hey there, @${tags.username}!`);
    };

    if(self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

	if(command === 'lurk' && myChannel) {
		client.say(channel, `${tags.username} is now lurking. <3`);
	};

	if(command === 'raid' && myChannel) {
		client.say(channel, `TombRaid GET CLAPPED!! TombRaid GET CLAPPED!! TombRaid GET CLAPPED!! TombRaid`);
	};

	if(command === 'so' && isModUp && myChannel) {
		client.say(channel, `Please give ${args[0]} a follow at https://www.twitch.tv/${args.join('').replace(/[^\w]/, '')}`);
	};

	if(command === 'multistream' && isModUp && myChannel) {
		client.say(channel, `We're streaming with ${args[0]}! Watch us both at https://multistre.am/${process.env.MY_CHANNEL}/${args.join('')}/layout4`);
	};

	if((command === 'discord' || command === 'dc') && myChannel) {
		client.say(channel, `Join the Big Flick Energy discord! ${process.env.DISCORD}`);
	};

	if(command === 'twitchplays' && isBroadcaster) {
		if(!twitchPlaysLive) {
			twitchPlaysLive = true;
		} else if(twitchPlaysLive) {
			twitchPlaysLive = false;
		};
	};

	if(command === 'play' && twitchPlaysLive) {
		client.say(channel, `You can use the following commands to interact: ${playCommands.join(', ')}`);
	};

	if(command === 'random' && twitchPlaysLive) {
		const res = Math.floor(Math.random() * randomCommands.length);
		client.say(channel, `${randomCommands[res]}`);
	};

	if(command === 'chances' && twitchPlaysLive) {
		client.say(channel, `20% chance: ${twentyPercent.join(', ')}`);
		client.say(channel, `10% chance: ${tenPercent.join(', ')}`);
		client.say(channel, `5% chance: ${fivePercent.join(', ')}`);
		client.say(channel, `2% chance: ${twoPercent.join(', ')}`);
		client.say(channel, `0.1% chance: ${pointOnePercent.join(', ')}`);
	};

	// Calling APIs
	if((command === 'ranks' || command === 'rank') && myChannel) {
		fetchTextApi(process.env.RL_RANKS)
		.then(data => client.say(channel, `${data}`));
	};

	if(command === 'accountage' && myChannel) {
		if(args.length === 0) {
			fetchTextApi(`https://decapi.me/twitch/accountage/${tags.username}`)
			.then(data => client.say(channel, `@${tags.username}'s account is ${data} old.`));
		} else if(args.length !== 0) {
			fetchTextApi(`https://decapi.me/twitch/accountage/${args[0].replace(/[^\w]/, '')}`)
			.then(data => client.say(channel, `@${tags.username}, ${args[0]}'s account is ${data} old.`));
		};
	};

	if(command === 'followage' && myChannel) {
		if(args.length === 0) {
			fetchTextApi(`https://2g.be/twitch/following.php?user=${tags.username}&channel=${process.env.MY_CHANNEL}&format=mwdhms`)
			.then(data => client.say(channel, `${data}`));
		} else if(args.length > 0) {
			fetchTextApi(`https://2g.be/twitch/following.php?user=${args[0].replace(/[^\w]/, '')}&channel=${process.env.MY_CHANNEL}&format=mwdhms`)
			.then(data => client.say(channel, `@${data}`));
		};
	};
});

// A little admin automation
client.on('resub', (channel, username, streakMonths, message, tags, methods) => {
	client.say(channel, `Thank you ${tags.username} for the resub! <3`);
});

client.on('subscription', (channel, username, methods, message, tags) => {
	client.say(channel, `Thank you ${tags.username} for the sub! <3`);
});

client.on('subgift', (channel, username, streakMonths, recipient, methods, tags) => {
	client.say(channel, `Thank you ${tags.username} for gifting a sub to ${recipient}! <3`);
});

client.on('raided', (channel, username, viewers, tags) => {
	client.say(channel, `${tags.username} is raiding with ${viewers} viewers! Thank you so much! <3`);
});