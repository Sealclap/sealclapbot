import dotenv from 'dotenv';
dotenv.config();
import tmi from 'tmi.js';
import fetch from 'node-fetch';
import { arg, index } from 'mathjs';

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    options: { debug: false },
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_TOKEN
	},
	channels: [ 'sealclap', 'saucyn3rd' ]
});

client.connect();
console.log(`fun.js connected to ${client.opts.channels.join(', ')}`);

async function fetchJsonApi(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

async function fetchTextApi(url) {
	const response = await fetch(url);
	const data = await response.text();
	return data;
};

let bald = 0

client.on('message', (channel, tags, message, self) => {

	if((Math.ceil(Math.random() * 1000) >= 950) && tags.username !== 'buttsbot' && !self) {
		const words = message.split(' ');
		const replacenum = Math.ceil(Math.random() * 5);
		let replacedwords = 0;

		while(replacenum > replacedwords) {
			const wordnum = Math.ceil(Math.random() * words.length);
			words[(wordnum - 1)] = "arf";
			replacedwords++;
		};

		client.say(channel, `${words.join(' ')}`);
	};

	if(tags.username === 'buttsbot' && message.toLowerCase() !== ':d') {
        client.say(channel, 'Buttsbot yes');
    };

	if(message.includes('^') && !self) {
		client.say(channel, '^');
	};

	const isMod = tags.mod || tags['user-type'] === 'mod';
	const isBroadcaster = channel.slice(1) === tags.username;
	const isModUp = isMod || isBroadcaster;
	const myChannel = channel.slice(1) === process.env.MY_CHANNEL;

	console.log(message);

    if(self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if(command === 'echo' && tags.username !== process.env.MY_CHANNEL) {
		client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
    };
	
    if(command === 'echo' && tags.username === process.env.MY_CHANNEL) {
		client.say(channel, `${args.join(' ')}`);
    };

	if(command === 'baldheadedfuck' && myChannel) {
		bald++;
		client.say(channel, `@Sealclap is a bald headed fuck.`);
		if(bald === 1) {
			client.say(channel, `Seal has been called a bald headed fuck ${bald} time this stream.`);
		} else if(bald > 1) {
			client.say(channel, `Seal has been called a bald headed fuck ${bald} times this stream.`);
		}
	};

	if(command === 'ban' && myChannel) {
		if(args.length > 0) {
			client.say(channel, `/me is pretend banning ${args.join(' ')}. It's not real, but it makes ${tags.username} feel better.`);
		} else if (args.length === 0) {
			client.say(channel, `/me is pretend banning ${tags.username}. Get rekt, idiot.`);
		};
	};

	if(command === 'fuck') {
		if(args.length > 0) {
			client.say(channel, `Yeah, fuck ${args.join(' ')}! But also, fuck you, ${tags.username}.`);
		} else if(args.length === 0) {
			client.say(channel, `Fuck you, ${tags.username}.`)
		};
	};

	if(command === 'hotness' && myChannel) {
		const hotness = Math.floor(Math.random() * 10) + 1;
		if(args.length === 0) {
			client.say(channel, `@${tags.username}, on a scale from 1 to 10, you're like a ${hotness}.`);
		} else if(args.length > 0) {
			client.say(channel, `${args.join(' ')}, on a scale from 1 to 10, you're like a ${hotness}.`);
		};
	};

    if(command === 'onlyfans' || command === 'of' && myChannel) {
		client.say(channel, `https://tinyurl.com/SealclapFans`);
	};

	if(command === 'wrangle' && myChannel) {
		if(args.length > 0) {
			client.say(channel, `Let's wrangle up those negative thoughts, ${args.join(' ')}. <3`);
		} else if(args.length === 0) {
			client.say(channel, `Let's wrangle up those negative thoughts, ${tags.username}. <3`)
		};
	};

    if(command === 'birthday' && myChannel) {
		var today = new Date();
		var bday = new Date(today.getFullYear(), 1, 22);
		var oneDay = 1000 * 60 * 60 * 24;
		if(today.getMonth() === 1 && today.getDate() > 22) {
			bday.setFullYear(bday.getFullYear() + 1);
		};
		var countDown = Math.ceil((bday.getTime() - today.getTime()) / oneDay);

		if (countDown > 1) {
			client.say(channel, `Only ${countDown} days until Sealclap's birthday!`);
		} else if (countDown === 1) {
			client.say(channel, `Only ${countDown} day until Sealclap's birthday!`);
		};
	};

	if(command === 'christmas') {
		var today = new Date();
		var bday = new Date(today.getFullYear(), 11, 25);
		var oneDay = 1000 * 60 * 60 * 24;
		if(today.getMonth() === 11 && today.getDate() > 25) {
			bday.setFullYear(bday.getFullYear() + 1);
		};
		var countDown = Math.ceil((bday.getTime() - today.getTime()) / oneDay);

		if (countDown > 1) {
			client.say(channel, `Only ${countDown} days until Christmas!`);
		} else if (countDown === 1) {
			client.say(channel, `Only ${countDown} day until Christmas!`);
		};
	};

	if(command === 'ftn' && myChannel) {
		var today = new Date();
		var bday = new Date(today.getFullYear(), 4, 27);
		var oneDay = 1000 * 60 * 60 * 24;
		if(today.getMonth() === 3 && today.getDate() > 5) {
			bday.setFullYear(bday.getFullYear() + 1);
		};
		var countDown = Math.ceil((bday.getTime() - today.getTime()) / oneDay);

		if (countDown > 1) {
			client.say(channel, `Only ${countDown} days until Sealclap's EAOS! Fuck the Navy!`);
		} else if (countDown === 1) {
			client.say(channel, `Only ${countDown} day until Sealclap's EAOS! Fuck the Navy!`);
		};
	};

	if(command === 'troubadour') {
		client.say(channel, `Doot doot!`);
	};

	if(command === 'seal' && myChannel) {
		client.say(channel, `Clap clap clap!`);
	};

    if(command === 'schwam' && myChannel) {
		client.say(channel, `We won't fuck a moose!`);
	};

	if(command === 'halnett' && myChannel) {
		client.say(channel, `aaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHH!`);
	};

	if(command === 'math') {
		const equation = eval(args.join(' '));
		client.say(channel, `The answer is: ${equation}`);
	};

	if(command === '8ball' && args.length > 0 && myChannel) {
		const res = Math.floor(Math.random() * 20);
		switch(res) {
			case 0:
				client.say(channel, `It is certain.`);
				break;
			case 1:
				client.say(channel, `It is decidedly so.`);
				break;
			case 2:
				client.say(channel, `Without a doubt.`);
				break;
			case 3:
				client.say(channel, `Yes definitely.`);
				break;
			case 4:
				client.say(channel, `You may rely on it.`);
				break;
			case 5:
				client.say(channel, `As I see it, yes.`);
				break;
			case 6:
				client.say(channel, `Most likely.`);
				break;
			case 7:
				client.say(channel, `Outlook good.`);
				break;
			case 8:
				client.say(channel, `Yes.`);
				break;
			case 9:
				client.say(channel, `Signs point to yes.`);
				break;
			case 10:
				client.say(channel, `Reply hazy, try again.`);
				break;
			case 11:
				client.say(channel, `Ask again later.`);
				break;
			case 12:
				client.say(channel, `Better not tell you now.`);
				break;
			case 13:
				client.say(channel, `Cannot predict now.`);
				break;
			case 14:
				client.say(channel, `Concentrate and ask again.`);
				break;
			case 15:
				client.say(channel, `Don't count on it.`);
				break;
			case 16:
				client.say(channel, `My reply is no.`);
				break;
			case 17:
				client.say(channel, `My sources say no.`);
				break;
			case 18:
				client.say(channel, `Outlook not so good.`);
				break;
			case 19:
				client.say(channel, `Very doubtful.`);
				break;
		};
	};

	if((command === 'penissize' || command === 'penis') && channel.slice(1) !== 'saucyn3rd') {
		const res = Math.ceil(Math.random() * 10);
		if(args.length === 0) {
			client.say(channel, `@${tags.username}, your penis is probably ${res} inches long.`);
		} else if(args.length > 0) {
			client.say(channel, `@${args[0].replace(/[^\w]/, '')}, your penis size is probably ${res} inches long.`);
		};
	};

	if((command === 'penissizeall' || command === 'penisall' || command === 'penissizechat' || command === 'penischat') && isModUp) {
		const url = `${process.env.PENIS_ALL_ONE}${channel.slice(1)}${process.env.PENIS_ALL_TWO}`;
		fetch(url)
			.then(jsonData => jsonData.json())
			.then(data => printIt(data));

		let printIt = (data) => {
			const streamer = data.chatters.broadcaster.join();
			const vips = data.chatters.vips;
			const mods = data.chatters.moderators;
			const viewing = data.chatters.viewers;
			const all = [];

			all.push(streamer);

			vips.forEach(el => {
				if(el === 'buttsbot' || el === 'sealclapbot' || el === 'nightbot' || el === 'streamelements' || el === 'anotherttvviewer') {
					return
				}
				if(el.length >= 1) {
					all.push(el)
				}
			});

			mods.forEach(el => {
				if(el === 'buttsbot' || el === 'sealclapbot' || el === 'nightbot' || el === 'streamelements' || el === 'anotherttvviewer') {
					return
				}
				if(el.length >= 1) {
					all.push(el)
				}
			});

			viewing.forEach(el => {
				if(el === 'buttsbot' || el === 'sealclapbot' || el === 'nightbot' || el === 'streamelements' || el === 'anotherttvviewer') {
					return
				}
				if(el.length >= 1) {
					all.push(el)
				}
			});

			all.forEach(el => {
				const res = Math.ceil(Math.random() * 10);
				client.say(channel, `@${el}, your penis is probably ${res} inches long.`);
			});
		};
	};

	if(command === 'coin' && myChannel) {
		client.say(channel, `Okay. I'll flip a coin...`);
		const res = Math.floor(Math.random() * 2);
		switch(res) {
			case 0:
				client.say(channel, `It's heads!`);
				break;
			case 1:
				client.say(channel, `It's tails!`);
				break;
		};
	};

	if(command === 'ctof') {
		const c = args[0];
		const f = (c * (9 / 5) + 32).toFixed(1);
		client.say(channel, `${c} degrees Celsius is ${f} degrees Fahrenheit.`); 
	};

	if(command === 'ftoc') {
		const f = args[0];
		const c = ((f - 32) * (5 / 9)).toFixed(1);
		client.say(channel, `${f} degrees Fahrenheit is ${c} degrees Celsius.`);
	};

	if(command === 'intocm') {
		const inch = args[0];
		const cm = (inch * 2.54).toFixed(1);
		client.say(channel, `${inch} inches is ${cm} centimeters.`);
	};

	if(command === 'cmtoin') {
		const cm = args[0];
		const inch = (cm / 2.54).toFixed(1);
		client.say(channel, `${cm} centimeters is ${inch} inches.`);
	};

	if(command === 'fttom') {
		const ft = args[0];
		const m = (ft / 3.281).toFixed(1);
		client.say(channel, `${ft} feet is ${m} meters.`);
	};

	if(command === 'mtoft') {
		const m = args[0];
		const ft = (m * 3.281).toFixed(1);
		client.say(channel, `${m} meters is ${ft} feet.`);
	};

	if(command === 'monkaw' && myChannel) {
		client.say(channel, `⣿⣿⣿⣿⣿⣿⣿⠿⢛⢛⡛⡻⢿⣿⣿⣿⣿⠟⠛⢛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿`);
		client.say(channel, `⣿⣿⣿⣿⢟⢱⡔⡝⣜⣜⢜⢜⡲⡬⡉⢕⢆⢏⢎⢇⢇⣧⡉⠿⣿⣿⣿⣿⣿⣿`);
		client.say(channel, `⣿⣿⡟⡱⣸⠸⢝⢅⢆⢖⣜⣲⣵⣴⣱⣈⡣⣋⢣⠭⣢⣒⣬⣕⣄⣝⡻⢿⣿⣿`);
		client.say(channel, `⣿⠟⡜⣎⢎⢇⢇⣵⣷⣿⣿⡿⠛⠉⠉⠛⢿⣦⢵⣷⣿⣿⣿⠟⠛⠋⠓⢲⡝⣿`);
		client.say(channel, `⢏⢰⢱⣞⢜⢵⣿⣿⣿⣿⣿⠁⠐⠄⠄⠄⠄⢹⣻⣿⣿⣿⠡⠄⠄⠄⠄⠄⠹⣺`);
		client.say(channel, `⢕⢜⢕⢕⢵⠹⢿⣿⣿⣿⣿⡀⠸⠗⣀⠄⠄⣼⣻⣿⣿⣿⡀⢾⠆⣀⠄⠄⣰⢳`);
		client.say(channel, `⡕⣝⢜⡕⣕⢝⣜⢙⢿⣿⣿⣷⣦⣤⣥⣤⣾⢟⠸⢿⣿⣿⣿⣦⣄⣉⣤⡴⢫⣾`);
		client.say(channel, `⡪⡪⣪⢪⢎⢮⢪⡪⡲⢬⢩⢩⢩⠩⢍⡪⢔⢆⢏⡒⠮⠭⡙⡙⠭⢝⣨⣶⣿⣿`);
		client.say(channel, `⡪⡪⡎⡮⡪⡎⡮⡪⣪⢣⢳⢱⢪⢝⢜⢜⢕⢝⢜⢎⢧⢸⢱⡹⡍⡆⢿⣿⣿⣿`);
		client.say(channel, `⡪⡺⡸⡪⡺⣸⠪⠚⡘⠊⠓⠕⢧⢳⢹⡸⣱⢹⡸⡱⡱⡕⡵⡱⡕⣝⠜⢿⣿⣿`);
		client.say(channel, `⡪⡺⡸⡪⡺⢐⢪⢑⢈⢁⢋⢊⠆⠲⠰⠬⡨⡡⣁⣉⠨⡈⡌⢥⢱⠐⢕⣼⣿⣿`);
		client.say(channel, `⡪⣪⢣⢫⠪⢢⢅⢥⢡⢅⢅⣑⡨⡑⠅⠕⠔⠔⠄⠤⢨⠠⡰⠠⡂⣎⣼⣿⣿⣿`);
		client.say(channel, `⠪⣪⡪⡣⡫⡢⡣⡣⡣⡣⡣⣣⢪⡪⡣⡣⡲⣑⡒⡎⡖⢒⣢⣥⣶⣿⣿⣿⣿⣿`);
		client.say(channel, `⢁⢂⠲⠬⠩⣁⣙⢊⡓⠝⠎⠮⠮⠚⢎⡣⡳⠕⡉⣬⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿`);
		client.say(channel, `⢐⠐⢌⠐⠅⡂⠄⠄⢌⢉⠩⠡⡉⠍⠄⢄⠢⡁⡢⠠⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿`);
	};

	if(command === 'banme' && myChannel) {
		client.timeout(channel, `${tags.username}`, 10, 'Because you asked for it');
		setTimeout(unban, 1000);
		function unban() {
			client.say(channel, `/untimeout ${tags.username}`);
		};
	};

	if(command === 'uwuize') {
		const uwuMessage = args.join(' ');
		const uwuArray = uwuMessage.split('');
		var uwuizedArr = [];

		/* uwuArray.forEach(el => {
			if(el === 'O') {
				uwuizedArr.push('OwO');
			} else if(el === 'o') {
				uwuizedArr.push('owo');
			} else if(el === 'U') {
				uwuizedArr.push('UwU');
			} else if(el === 'u') {
				uwuizedArr.push('uwu');
			} else {
				uwuizedArr.push(el);
			};
		}); */

		uwuArray.forEach(el => {
			switch(el) {
				case 'O':
					uwuizedArr.push('OwO');
					break;
				case 'o':
					uwuizedArr.push('owo');
					break;
				case 'U':
					uwuizedArr.push('UwU');
					break;
				case 'u':
					uwuizedArray.push('uwu');
					break;
				default:
					uwuizedArr.push(el);
					break;
			};
		});

		uwuizedArr.push(' ');
		uwuizedArr.push('UWU');

		const uwuizedText = uwuizedArr.join('');

		client.say(channel, `${uwuizedText}`);
	};

	// Calling APIs
	if(command === 'insult' && myChannel) {
		if(args.length === 0) {
			fetchJsonApi(process.env.INSULT_API)
			.then(data => client.say(channel, `${tags.username}, ${data.insult}`));
		} else if(args.length > 0) {
			fetchJsonApi(process.env.INSULT_API)
			.then(data => client.say(channel, `${args.join(' ')}, ${data.insult}`));
		}
	};

    if(command === 'catfact' && myChannel) {
		fetchTextApi(process.env.CATFACT_API)
		.then(data => client.say(channel, `${data}`));
	};

	if(command === 'fmylife' || command === 'fml') {
		fetchJsonApi(process.env.FML_API)
		.then(data => client.say(channel, `${data}`));
	};

	if(command === 'weather' && myChannel) {
		fetchJsonApi(process.env.WEATHER_API)
		.then(data => client.say(channel, `It is currently ${data[0]} and ${data[1]} at Sealclap's right now!`));
	};
});