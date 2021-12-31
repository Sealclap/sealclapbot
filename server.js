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


	// So other users can't exploit SealclapBot's admin rights
    if(command.toLowerCase() === 'echo' && tags.username !== 'sealclap') {
		client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
    };
	
    if(command.toLowerCase() === 'echo' && tags.username === 'sealclap') {
		client.say(channel, `${args.join(' ')}`);
    };

	// Specifically for Schwam's channel
    if(command.toLowerCase() === 'casey') {
		client.say(channel, `@casey_robbitz is a big cutie!`);
    };
	
    if(command.toLowerCase() === 'hully') {
		client.say(channel, `@HullyGee is a big cutie!`);
    };
	
	// For Chook <3
    if(command.toLowerCase() === 'baldheadedfuck') {
		client.say(channel, `@Sealclap is a bald headed fuck.`);
    };

    // For the Phasmo overlay during stream
	if(command.toLowerCase() === 'gr') {
		client.say(channel, 'Just resetting the board.');
	};

	if(command.toLowerCase() === 'gn') {
		client.say(channel, `Ghost name set to ${args.join(' ')}.`);
	};

	if(command.toLowerCase() === 'map') {
		var currentMap = '';
		if(args[0] === 'bl') {
			currentMap = 'Bleasdale Farmhouse';
		} else if(args[0] === 'ed') {
			currentMap = 'Edgefield Street House';
		} else if(args[0] === 'gr') {
			currentMap = 'Grafton Farmhouse';
		} else if(args[0] === 'ri') {
			currentMap = 'Ridgeview Road House';
		} else if(args[0] === 'ta') {
			currentMap = 'Tanglewood Street House';
		} else if(args[0] === 'wi') {
			currentMap = 'Willow Street House';
		} else if(args[0] === 'hs') {
			currentMap = 'Brownstone High School';
		} else if(args[0] === 'pr') {
			currentMap = 'Prison';
		} else if(args[0] === 'as') {
			currentMap = 'Asylum';
		} else if(args[0] === 'ca') {
			currentMap = 'Maple Lodge Campsite';
		} else {
			currentMap = 'unknown';
		};
		client.say(channel, `Map set to ${currentMap}.`);
	};

	if(command.toLowerCase() === 'diff') {
		var currentDifficulty = '';
		if(args[0] === 'a') {
			currentDifficulty = 'amateur';
		} else if(args[0] === 'i') {
			currentDifficulty = 'intermediate';
		} else if(args[0] === 'p') {
			currentDifficulty = 'professional';
		} else if(args[0] === 'n') {
			currentDifficulty = 'nightmare';
		} else {
			currentDifficulty = 'unknown';
		};
		client.say(channel, `Difficulty set to ${currentDifficulty}.`);
	};

	if(command.toLowerCase() === 'deathsup') {
		client.say(channel, 'Oops! We died again! Adding to the death total.');
	};

	if(command.toLowerCase() === 'deathsdown') {
		client.say(channel, 'Just correcting the death total.');
	};

	if(command.toLowerCase() === 'wrongup') {
		client.say(channel, 'Oops! We guessed wrong! Adding to the incorrect guess total.');
	};

	if(command.toLowerCase() === 'wrongdown') {
		client.say(channel, 'Just correcting the incorrect guess total.');
	};

	if(command.toLowerCase() === 'ge') {
		client.say(channel, 'We just got EMF 5!');
	};

	if(command.toLowerCase() === 'gs') {
		client.say(channel, 'We just got spirit box!');
	};

	if(command.toLowerCase() === 'gf') {
		client.say(channel, 'We just got fingerprints!');
	};

	if(command.toLowerCase() === 'go') {
		client.say(channel, 'We just got ghost orbs!');
	};

	if(command.toLowerCase() === 'gw') {
		client.say(channel, 'We just got ghost writing!');
	};

	if(command.toLowerCase() === 'gt') {
		client.say(channel, 'We just got freezing temps!');
	};

	if(command.toLowerCase() === 'gd') {
		client.say(channel, 'We just got dots!');
	};

	if(command.toLowerCase() === 'oo') {
		var objective = '';
		if(args[0] === 'ca') {
			objective = 'get the ghost to blow out a candle';
		} else if(args[0] === 'cr') {
			objective = 'prevent the ghost from hunting with a crucifix';
		} else if(args[0] === 'em') {
			objective = 'find evidence of paranormal activity with an EMF reader';
		} else if(args[0] === 'es') {
			objective = 'have a member of the team escape during a hunt';
		} else if(args[0] === 'ev') {
			objective = 'have a member of the team witness a ghost event';
		} else if(args[0] === 'hu') {
			objective = 'repel the ghost with a smudge stick while it\'s chasing someone';
		} else if(args[0] === 'mo') {
			objective = 'detect a ghost\'s presence with a motion sensor';
		} else if(args[0] === 'ph') {
			objective = 'capture a photo of the ghost';
		} else if(args[0] === 'sa') {
			objective = 'get the ghost to walk through salt';
		} else if(args[0] === 'san') {
			objective = 'get an average sanity below 25%';
		} else if(args[0] === 'sm') {
			objective = 'cleanse the area near the ghost using smudge sticks';
		} else {
			objective = 'find out what type of ghost we\'re dealing with';
		};
		client.say(channel, `We need to ${objective}.`);
	};

	if(command.toLowerCase() === 'o1' || command.toLowerCase() === 'o2' || command.toLowerCase() === 'o3') {
		client.say(channel, 'We just completed an optional objective!');
	};
});
