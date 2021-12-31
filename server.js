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
	// Starting with the maps
	const tanglewood = "Tanglewood Street House";
	const willow = "Willow Street House";
	const edgefield = "Edgefield Street House";
	const ridgeview = "Ridgeview Road House";
	const grafton = "Grafton Farmhouse";
	const bleasdale = "Bleasdale Farmhouse";
	const school = "Brownstone High School";
	const prison = "Prison";
	const asylum = "Asylum";
	const camp = "Maple Lodge Campsite";

	// Next, difficulties
	const amateur = "amateur";
	const intermediate = "intermediate";
	const professional = "professional";
	const nightmare = "nightmare";

	// Now optional objectives
	const emf = 'find evidence of paranormal activity with an EMF reader';
	const photo = 'capture a photo of the ghost';
	const motion = 'detect a ghost\'s presence with a motion sensor';
	const crucifix = 'prevent the ghost from hunting with a crucifix';
	const event = 'have a member of the team witness a ghost event';
	const smudge = 'cleanse the area near the ghost using smudge sticks';
	const salt = 'get the ghost to walk through salt';
	const repel = 'repel the ghost with a smudge stick while it\'s chasing someone';
	const candle = 'get the ghost to blow out a candle';
	const escape = 'have a member of the team escape during a hunt';
	const sanity = 'get an average sanity below 25%';

	if(command.toLowerCase() === 'gr') {
		client.say(channel, 'Just resetting the board.');
	};

	if(command.toLowerCase() === 'gn') {
		client.say(channel, `Ghost name set to ${args.join(' ')}.`);
	};

	if(command.toLowerCase() === 'map') {
		var currentMap;
		if(args === 'bl') {
			currentMap = bleasdale;
		} else if(args === 'ed') {
			currentMap = edgefield;
		} else if(args === 'gr') {
			currentMap = grafton;
		} else if(args === 'ri') {
			currentMap = ridgeview;
		} else if(args === 'ta') {
			currentMap = tanglewood;
		} else if(args === 'wi') {
			currentMap = willow;
		} else if(args === 'hs') {
			currentMap = school;
		} else if(args === 'pr') {
			currentMap = prison;
		} else if(args === 'as') {
			currentMap = asylum;
		} else if(args === 'ca') {
			currentMap = camp;
		} else {
			currentMap = 'unknown';
		};
		client.say(channel, `Map set to ${currentMap}.`);
	};

	if(command.toLowerCase() === 'diff') {
		var currentDifficulty;
		if(args === 'a') {
			currentDifficulty = amateur;
		} else if(args === 'i') {
			currentDifficulty = intermediate;
		} else if(args === 'p') {
			currentDifficulty = professional;
		} else if(args === 'n') {
			currentDifficulty = nightmare;
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
		var objective;
		if(args === 'ca') {
			objective = candle;
		} else if(args === 'cr') {
			objective = crucifix;
		} else if(args === 'em') {
			objective = emf;
		} else if(args === 'es') {
			objective = escape;
		} else if(args === 'ev') {
			objective = event;
		} else if(args === 'hu') {
			objective = repel;
		} else if(args === 'mo') {
			objective = motion;
		} else if(args === 'ph') {
			objective = photo;
		} else if(args === 'sa') {
			objective = salt;
		} else if(args === 'san') {
			objective = sanity;
		} else if(args === 'sm') {
			objective = smudge;
		} else {
			objective = 'find out what type of ghost we\'re dealing with';
		};
		client.say(channel, `We need to ${objective}.`);
	};

	if(command.toLowerCase() === 'o1' || command.toLowerCase() === 'o2' || command.toLowerCase() === 'o3') {
		client.say(channel, 'We just completed an optional objective!');
	};
});
