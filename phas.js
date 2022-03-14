import dotenv from 'dotenv';
dotenv.config();
import tmi from 'tmi.js';

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    options: { debug: false },
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_TOKEN
	},
	channels: [ 'sealclap' ]
});

client.connect();
console.log(`phas.js connected to ${client.opts.channels.join(', ')}`);

client.on('message', (channel, tags, message, self) => {

	const isMod = tags.mod || tags['user-type'] === 'mod';
	const isBroadcaster = channel.slice(1) === tags.username;
	const isModUp = isMod || isBroadcaster;
	const myChannel = channel.slice(1) === process.env.MY_CHANNEL;

    if(self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if(command === 'phas' && isModUp && myChannel) {
		client.say(channel, `Randomly choosing a map...`);
		client.say(channel, `Done! I have randomly selected...`);
		var randomChoice = Math.floor(Math.random() * 7);
		switch(randomChoice) {
			case 0:
				client.say(channel, `Tanglewood Street House!`);
				break;
			case 1:
				client.say(channel, `Ridgeview Road House!`);
				break;
			case 2:
				client.say(channel, `Bleasdale Farmhouse!`);
				break;
			case 3:
				client.say(channel, `Edgefield Street House!`);
				break;
			case 4:
				client.say(channel, `Grafton Farmhouse!`);
				break;
			case 5:
				client.say(channel, `Willow Street House!`);
				break;
			case 6:
				client.say(channel, `Brownstone High School!`);
				break;
		};
	};

	if(command === 'tarot' && myChannel) {
		switch(args[0]) {
			case 'sun':
				client.say(channel, `Fully restores sanity to 100%`);
				break;
			case 'moon':
				client.say(channel, `Immediately drops sanity to 0%`);
				break;
			case 'tower':
				client.say(channel, `Causes an interaction`);
				break;
			case 'wheel':
				client.say(channel, `Either increases the player's sanity by 25% (if it burns green) or decreases it by 25% (if it burns red)`);
				break;
			case 'devil':
				client.say(channel, `Triggers a ghost event`);
				break;
			case 'priestess':
				client.say(channel, `Randomly selects one dead player and resurrects them`);
				break;
			case 'hanged':
				client.say(channel, `Instantly kills player`);
				break;
			case 'death':
				client.say(channel, `Triggers a cursed hunt`);
				break;
			case 'hermit':
				client.say(channel, `Teleports the ghost back to its ghost room and prevents it from leaving for 1 minute`);
				break;
			case 'fool':
				client.say(channel, `Appears as another card at first before turning into The Fool just before it burns. This card does not have any effect on the player`);
				break;
			default:
				client.say(channel, `Which card did you want to hear about?`);
				break;
		};
	};

	if(command === 'gr' && isBroadcaster && myChannel) {
		client.say(channel, 'Just resetting the board.');
	};

	if(command === 'gn' && isBroadcaster && myChannel) {
		client.say(channel, `Ghost name set to ${args.join(' ')}.`);
	};

	if(command === 'map' && isBroadcaster && myChannel) {
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

	if(command === 'diff' && isBroadcaster && myChannel) {
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

	if(command === 'deathsup' && isBroadcaster && myChannel) {
		client.say(channel, 'Oops! We died again! Adding to the death total.');
	};

	if(command === 'deathsdown' && isBroadcaster && myChannel) {
		client.say(channel, 'Just correcting the death total.');
	};

	if(command === 'wrongup' && isBroadcaster && myChannel) {
		client.say(channel, 'Oops! We guessed wrong! Adding to the incorrect guess total.');
	};

	if(command === 'wrongdown' && isBroadcaster && myChannel) {
		client.say(channel, 'Just correcting the incorrect guess total.');
	};

	if(command === 'ge' && isBroadcaster && myChannel) {
		client.say(channel, 'We just got EMF 5!');
	};

	if(command === 'gs' && isBroadcaster && myChannel) {
		client.say(channel, 'We just got spirit box!');
	};

	if(command === 'gf' && isBroadcaster && myChannel) {
		client.say(channel, 'We just got fingerprints!');
	};

	if(command === 'go' && isBroadcaster && myChannel) {
		client.say(channel, 'We just got ghost orbs!');
	};

	if(command === 'gw' && isBroadcaster && myChannel) {
		client.say(channel, 'We just got ghost writing!');
	};

	if(command === 'gt' && isBroadcaster && myChannel) {
		client.say(channel, 'We just got freezing temps!');
	};

	if(command === 'gd' && isBroadcaster && myChannel) {
		client.say(channel, 'We just got dots!');
	};

	if(command === 'oo' && isBroadcaster && myChannel) {
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

	if((command === 'o1' || command === 'o2' || command === 'o3') && isBroadcaster && myChannel) {
		client.say(channel, 'We just completed an optional objective!');
	};

	if(command === 'info' && myChannel && isModUp) {
		if(args[0] === 'spirit') {
			client.say(channel, `Spirit -- Evidence: EMF 5, Spirit box, Ghost writing`);
			client.say(channel, `Cannot hunt for 180 seconds after being smudged with a smudge stick`);
			client.say(channel, `Are generally more active due to their shorter idle timer`);
		} else if(args[0] === 'wraith') {
			client.say(channel, `Wraith -- Evidence: EMF 5, Spirit box, DOTS`);
			client.say(channel, `Does not leave UV light salt footprints`);
			client.say(channel, `Can sometimes (but rarely) teleport to a random player's location`);
			client.say(channel, `Activity modifier increases after stepping in salt`);
		} else if(args[0] === 'phantom') {
			client.say(channel, `Phantom -- Evidence: Spirit box, Fingerprints, DOTS`);
			client.say(channel, `Disappears after taking a photo of them`);
			client.say(channel, `Blinks twice as slow during hunts`);
			client.say(channel, `Looking at this ghost drains twice as much sanity (0.4% per second)`);
		} else if(args[0] === 'poltergeist') {
			client.say(channel, `Poltergeist -- Evidence: Spirit box, Fingerprints, Ghost writing`);
			client.say(channel, `Can throw multiple objects at once. Each object thrown during this drains 2% sanity`);
			client.say(channel, `Can throw objects at a greater speed (not as fast as an Oni)`);
		} else if(args[0] === 'banshee') {
			client.say(channel, `Banshee -- Evidence: Fingerprints, Ghost orbs, DOTS`);
			client.say(channel, `Always goes after one player at a time and ignores the other players if the target is in the building`);
			client.say(channel, `The crucifix's range is 5 meters for a banshee`);
			client.say(channel, `Can sometimes (but rarely) make a unique sound on the parabolic microphone`);
		} else if(args[0] === 'jinn') {
			client.say(channel, `Jinn -- Evidence: EMF 5, Fingerprints, Freezing temperatures`);
			client.say(channel, `Does not interact with the breaker directly (can still turn it off by turning on too many lights)`);
			client.say(channel, `Can sometimes drain 25% sanity from all players within 3 meters of it`);
			client.say(channel, `Moves much faster when chasing a player from more than 2-3 meters away during hunts when the breaker is on`);
			client.say(channel, `Moves at the normal ghost speed when the breaker is turned off`);
		} else if(args[0] === 'mare') {
			client.say(channel, `Mare -- Evidence: Spirit box, Ghost orbs, Ghost writing`);
			client.say(channel, `Can hunt at 60% sanity or lower if the light in its room is turned off`);
			client.say(channel, `Can only hunt at 40% sanity or lower if the light in its room is turned on`);
			client.say(channel, `Can never turn any lights on`);
			client.say(channel, `Can sometimes instantly turn the light off a player just switched on`);
		} else if(args[0] === 'revenant') {
			client.say(channel, `Revenant -- Evidence: Ghost orbs, Ghost writing, Freezing temperatures`);
			client.say(channel, `Moves significantly faster if chasing a player`);
			client.say(channel, `Moves significantly slower if not chasing a player (slower footstep sounds)`);
			client.say(channel, `Does not increase in speed when chasing a player`);
		} else if(args[0] === 'shade') {
			client.say(channel, `Shade -- Evidence: EMF 5, Ghost writing, Freezing temperatures`);
			client.say(channel, `Can only hunt at 35% sanity or lower`);
			client.say(channel, `Very shy and can be hard to find`);
		} else if(args[0] === 'demon') {
			client.say(channel, `Demon -- Evidence: Fingerprints, Ghost writing, Freezing temperatures`);
			client.say(channel, `Can sometimes (but rarely) hunt at any sanity level (even at 100%)`);
			client.say(channel, `Normally hunts at 70% sanity or lower`);
			client.say(channel, `Smudge sticks only stop a demon from hunting for 60 seconds`);
			client.say(channel, `Have a shorter hunt cooldown of 20 seconds`);
			client.say(channel, `Drains 20% less sanity when a player loses sanity from a cursed possession`);
		} else if(args[0] === 'yurei') {
			client.say(channel, `Yurei -- Evidence: Ghost orbs, Freezing temperatures, DOTS`);
			client.say(channel, `Cannot wander for 90 seconds after being smudged`);
			client.say(channel, `Looking at this ghost drains twice as much sanity (0.4% per second)`);
			client.say(channel, `Can do "invisible" ghost events where they do not show up but still close one or more doors and drain 15% sanity`);
		} else if(args[0] === 'oni') {
			client.say(channel, `Oni -- Evidence: EMF 5, Freezing temperatures, DOTS`);
			client.say(channel, `Can sometimes throw objects ridiculously fast`);
		} else if(args[0] === 'yokai') {
			client.say(channel, `Yokai -- Evidence: Spirit box, ghost orbs, DOTS`);
			client.say(channel, `Can hunt at up to 80% sanity if someone is talking within 2 meters of it`);
			client.say(channel, `Can only sense player voices and electronics when they are 2 meters away or less while they are hunting`);
		} else if(args[0] === 'hantu') {
			client.say(channel, `Hantu -- Evidence: Fingerprints, Ghost orbs, Freezing temperatures`);
			client.say(channel, `Moves slightly faster (~15-20%) when in lower temperature rooms`);
			client.say(channel, `Moves slightly slower (~15-20%) when in higher temperature rooms`);
			client.say(channel, `Its freezing breath is visible when hunting in a freezing temperature room`);
			client.say(channel, `Will always have freezing temps evidence on nightmare difficulty`);
		} else if(args[0] === 'goryo') {
			client.say(channel, `Goryo -- Evidence: Spirit box, Ghost writing, DOTS`);
			client.say(channel, `DOTS projector evidence for this ghost is only visible on camera`);
			client.say(channel, `Are much less likely to wander far from its ghost room`);
			client.say(channel, `Will always have DOTS projector evidence on nightmare difficulty`);
			client.say(channel, `Will not give DOTS projector evidence when anyone is in their room`);
		} else if(args[0] === 'myling') {
			client.say(channel, `Myling -- Evidence: EMF 5, Fingerprints, Ghost writing`);
			client.say(channel, `Their footstep sounds during hunts can only be heard from within the electronic disruption range (around 10-12 meters)`);
			client.say(channel, `Are more likely to produce paranormal sounds on the parabolic microphone`);
		} else if(args[0] === 'onryo') {
			client.say(channel, `Onryo -- Evidence: Spirit box, Ghost orbs, Freezing temperatures`);
			client.say(channel, `Can hunt at 60% sanity or lower if there are no flames next to it`);
			client.say(channel, `Has a chance to hunt at any sanity if it blows out a candle`);
			client.say(channel, `Lit candles act like crucifixes and makes the ghost blow out the candle instead of hunting (also prioritized over a crucifix)`);
		} else if(args[0] === 'twins') {
			client.say(channel, `The Twins -- Evidence: EMF 5, Spirit box, Freezing Temperatures`);
			client.say(channel, `Are likely to do two interactions at the same time`);
			client.say(channel, `Either twin can start a hunt from their current location (could even happen when using the summoning circle)`);
		} else if(args[0] === 'raiju') {
			client.say(channel, `Raiju -- Evidence: EMF 5, Ghost orbs, DOTS`);
			client.say(channel, `Can hunt at 65% sanity or lower in the presence of electronic equipment`);
			client.say(channel, `Moves significantly faster during hunts near electronic equipment (faster footsteps)`);
			client.say(channel, `Disrupts electronics at a longer range`);
		} else if(args[0] === 'obake') {
			client.say(channel, `Obake -- Evidence: EMF 5, Fingerprints, Ghost orbs`);
			client.say(channel, `Can rarely leave unique six-fingered fingerprint evidence upon an interaction`);
			client.say(channel, `Can only leave fingerprint evidence 75% of the time`);
			client.say(channel, `Always has fingerprint evidence on nightmare difficulty`);
			client.say(channel, `Has a small chance to have its fingerprints disappear after 1 minute`);
		} else if(args[0] === 'mimic') {
			client.say(channel, `The Mimic -- Evidence: Spirit box, Fingerprints, Freezing temperatures`);
			client.say(channel, `Has the ability to mimic the actions, behavior, and abilities of any ghost type`);
			client.say(channel, `Also shows ghost orbs in addition to its three (or two) evidences given`);
			client.say(channel, `Periodically changes the ghost type it's currently mimicking`);
			client.say(channel, `Can potentially hunt at any sanity and any speed depending on the ghost type being mimicked.`);
		} else if(args[0] === 'normal') {
			client.say(channel, `Normal ghost behavior:`);
			client.say(channel, `Hunt at 50% sanity or lower (any if a cursed possession triggers a hunt)`);
			client.say(channel, `Drain 0.2% sanity per second when a player looks at them`);
			client.say(channel, `Cannot hunt for 90 seconds after being smudged`);
			client.say(channel, `Has a hunt cooldown of 25 seconds`);
			client.say(channel, `The hearing range and electronic disruption range is 10-12 meters`);
			client.say(channel, `Typically do around 2.5 +/- 0.25 interactions per minute when no one is in the house`);
			client.say(channel, `Move at a slightly slower speed than the player's walking speed during hunts`);
			client.say(channel, `Always leave fingerprints upon an interaction (if fingerprint evidence)`);
			client.say(channel, `Have their fingerprints disappear after 2 minutes (if fingerprint evidence)`);
			client.say(channel, `Has a crucifix range of 3 meters`);
			client.say(channel, `Footsteps can be heard from up to 20 meters away during hunts`);
		} else {
			client.say(channel, `Which ghost would you like to learn about?`);
		};
	};
});