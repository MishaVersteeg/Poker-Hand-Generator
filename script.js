
let canvas = document.getElementById('myChart');

let data = {
	labels: ["HC", "P", "2P", "LS", "3K", "Strt", "flsh", "FH", "4K", "SF", "RF"],
	datasets: [
		{
			label: "n hands",
			data: [],
		}
	]
};

setInterval(function adddata() {

	myLineChart.data.datasets[0].data[0]  =  vue1.highCard;
	myLineChart.data.datasets[0].data[1]  =  vue1.pair;
	myLineChart.data.datasets[0].data[2]  =  vue1.twoPair;
	myLineChart.data.datasets[0].data[3]  =  vue1.littleStraight;
	myLineChart.data.datasets[0].data[4]  =  vue1.threeKind;
	myLineChart.data.datasets[0].data[5]  =  vue1.straight;
	myLineChart.data.datasets[0].data[6]  =  vue1.flush;
	myLineChart.data.datasets[0].data[7]  =  vue1.fullHouse;
	myLineChart.data.datasets[0].data[8]  =  vue1.fourKind;
	myLineChart.data.datasets[0].data[9]  =  vue1.straightFlush;
	myLineChart.data.datasets[0].data[10] =  vue1.royalFlush;

	myLineChart.update();

}, 50)

let myLineChart = Chart.Bar(canvas, { data: data, });


vue1 = new Vue({
	el: '#VueEvent',
	data: {
		royalFlush: 0,
		straightFlush: 0,
		fourKind: 0,
		fullHouse: 0,
		flush: 0,
		straight: 0,
		threeKind: 0,
		littleStraight: 0,
		twoPair: 0,
		pair: 0,
		highCard: 0,
		rounds: 0,
		totalRounds: 0,

		buttonOn: false
	},

	methods: {
		spin: function () {

			if (this.buttonOn == false) {
				this.rounds = 0;
				interval = setInterval(function startSpin() {
					showAllCards();
					determineHand();
				}, 20);
				this.buttonOn = true;
			} else {
				clearInterval(interval);
				this.buttonOn = false;
			}
		}
	}
})



deck = [
	'Sa', 'Sb', 'Sc', 'Sd', 'Se', 'Sf', 'Sg', 'Sh', 'Si', 'Sj', 'Sk', 'Sl', 'Sm', 'Ca', 'Cb', 'Cc', 'Cd', 'Ce', 'Cf', 'Cg', 'Ch', 'Ci', 'Cj', 'Ck', 'Cl', 'Cm', 'Ha', 'Hb', 'Hc', 'Hd', 'He', 'Hf', 'Hg', 'Hh', 'Hi', 'Hj', 'Hk', 'Hl', 'Hm', 'Da', 'Db', 'Dc', 'Dd', 'De', 'Df', 'Dg', 'Dh', 'Di', 'Dj', 'Dk', 'Dl', 'Dm'
]


holeCards = []; flop = []; turn = []; river = []; eightCard = []; hand = [];

eightCardOn = 'OFF'
jortModeOn = 'OFF'


triggerCards = (type) => {

	// dump open cards to deck:
	if (type == holeCards || type == flop || type == turn || type == river || type == eightCard) {
		a = type.pop(); deck.push(a);
	} if (type == holeCards || type == flop) {
		a = type.pop(); deck.push(a);
	} if (type == flop) {
		a = type.pop(); deck.push(a);
	}

	deck.sort(function (a, b) { return 0.5 - Math.random() });

	// get cards from deck:
	if (type == holeCards) {
		type = deck.splice(0, 2);
		return type;
	}

	if (type == flop) {
		type = deck.splice(0, 3);
		return type;
	}

	if (type == turn || type == river || type == eightCard) {
		type = deck.splice(0, 1);
		return type;
	}
};

eightCardOnOff = () => {
	if (eightCardOn == 'OFF') {
		eightCardOn = 'ON';
		document.getElementById("eightCardJPG0").src = "cards/back.jpg";

	} else {
		eightCardOn = 'OFF';
		eightCard = []
		document.getElementById("eightCardJPG0").src = "";

	}

	document.getElementById("eightCardOn").innerHTML = eightCardOn;
};

jortModeOnOff = () => {
	if (jortModeOn == 'OFF') {
		jortModeOn = 'ON';
		

	} else {
		jortModeOn = 'OFF';
		



	}

	document.getElementById("jortModeOn").innerHTML = jortModeOn;
};

dealEightCard = () => {

	if (eightCardOn == 'ON') {
		eightCard = triggerCards(eightCard);

		document.getElementById("eightCardJPG0").src = "cards/" + eightCard[0] + ".jpg";
	} else {
		document.getElementById("eightCardJPG0").src = ""
	}
}

dealHoleCards = () => {

	holeCards = triggerCards(holeCards);

	document.getElementById("holeCardsJPG0").src = "cards/" + holeCards[0] + ".jpg";
	document.getElementById("holeCardsJPG1").src = "cards/" + holeCards[1] + ".jpg";
};


showFlop = () => {

	flop = triggerCards(flop);

	document.getElementById("flopJPG0").src = "cards/" + flop[0] + ".jpg";
	document.getElementById("flopJPG1").src = "cards/" + flop[1] + ".jpg";
	document.getElementById("flopJPG2").src = "cards/" + flop[2] + ".jpg";
};


showTurn = () => {

	turn = triggerCards(turn);

	document.getElementById("turnJPG0").src = "cards/" + turn[0] + ".jpg";
};


showRiver = () => {

	river = triggerCards(river);

	document.getElementById("riverJPG0").src = "cards/" + river[0] + ".jpg";
};


showAllCards = () => {

	dealHoleCards();
	showAllSharedCards();
};


showAllSharedCards = () => {

	showFlop();
	showTurn();
	showRiver();
	dealEightCard();
	
};


resetDeck = () => {

	vue1.data = new Array
	//clearInterval(adddata);
	myLineChart.data.datasets[0].data = [0]
	//myLineChart.update();


	vue1.highCard = 0
	vue1.pair = 0
	vue1.twoPair = 0
	vue1.threeKind = 0
	vue1.littleStraight = 0
	vue1.straight = 0
	vue1.flush = 0
	vue1.fullHouse = 0
	vue1.fourKind = 0
	vue1.straightFlush = 0
	vue1.royalFlush = 0
	vue1.totalRounds = 0

	a = holeCards.pop(); deck.push(a);
	b = holeCards.pop(); deck.push(b);
	c = flop.pop(); deck.push(c);
	d = flop.pop(); deck.push(d);
	e = flop.pop(); deck.push(e);
	f = turn.pop(); deck.push(f);
	g = river.pop(); deck.push(g);

	displayHand = "Press some buttons!"
	document.getElementById("hand").innerHTML = displayHand;

	document.getElementById("holeCardsJPG0").src = "cards/back.jpg";
	document.getElementById("holeCardsJPG1").src = "cards/back.jpg";
	document.getElementById("flopJPG0").src = "cards/back.jpg";
	document.getElementById("flopJPG1").src = "cards/back.jpg";
	document.getElementById("flopJPG2").src = "cards/back.jpg";
	document.getElementById("turnJPG0").src = "cards/back.jpg";
	document.getElementById("riverJPG0").src = "cards/back.jpg";

	if(eightCardOn == 'ON') {document.getElementById("eightCardJPG0").src = "cards/back.jpg"}
	

	
};


determineHand = () => {

	allCards = holeCards.concat(flop, turn, river, eightCard);

	spades = new Array;
	clubs = new Array;
	hearts = new Array;
	diamonds = new Array;

	cardSuit = new Array;
	cardValue = new Array;
	suit = new Array;
	cardNumbers = new Array;
	numbersUnique = new Array;
	ifStraight = new Array;
	sameValue = new Array;


	emptyArrays = () => {

		spades = new Array;
		clubs = new Array;
		hearts = new Array;
		diamonds = new Array;

		cardSuit = new Array;
		cardValue = new Array;
		suit = new Array;
		cardNumbers = new Array;
		numbersUnique = new Array;
		ifStraight = new Array;
		sameValue = new Array;
	};


	pushSuits = () => {

		spades = allCards.filter((suit) => suit.startsWith('S'));
		clubs = allCards.filter((suit) => suit.startsWith('C'));
		hearts = allCards.filter((suit) => suit.startsWith('H'));
		diamonds = allCards.filter((suit) => suit.startsWith('D'));

		if (spades.length > 4) {
			for (let i = 0; i < spades.length; i++) {
				let split = spades[i].split('');
				cardSuit.push(split[0]);
				cardValue.push(split[1]);
			}
			suit.push('Spades');

		} if (clubs.length > 4) {
			for (let i = 0; i < clubs.length; i++) {
				let split = clubs[i].split('');
				cardSuit.push(split[0]);
				cardValue.push(split[1]);
			}
			suit.push('clubs');

		} if (hearts.length > 4) {
			for (let i = 0; i < hearts.length; i++) {
				let split = hearts[i].split('');
				cardSuit.push(split[0]);
				cardValue.push(split[1]);
			}
			suit.push('hearts');

		} if (diamonds.length > 4) {
			for (let i = 0; i < diamonds.length; i++) {
				let split = diamonds[i].split('');
				cardSuit.push(split[0]);
				cardValue.push(split[1]);
			}
			suit.push('diamonds')
		}
	};


	toInteger = () => {

		for (let i = 0; i < cardValue.length; i++) {
			cardNumbers.push(cardValue[i].charCodeAt() - 96);
		}
	};


	split = () => {

		for (let i = 0; i < allCards.length; i++) {
			let split = allCards[i].split('');
			cardSuit.push(split[0]);
			cardValue.push(split[1]);
		}
	};


	testStraightFlush = () => {

		pushSuits();

		if (cardSuit.length > 4) {

			cardValue.sort(); toInteger();

			if (cardNumbers.indexOf(1) !== -1
				&& cardNumbers.indexOf(10) !== -1
				&& cardNumbers.indexOf(11) !== -1
				&& cardNumbers.indexOf(12) !== -1
				&& cardNumbers.indexOf(13) !== -1) {
				hand = 'royalFlush';

			} else {

				for (let i = 0; i < cardNumbers.length; i++) {
					if (cardNumbers[i + 1] == cardNumbers[i] + 1 || cardNumbers[i] - 1 == cardNumbers[i - 1]) {
						ifStraight.push(cardNumbers[i]);
					}
				}

				ifStraight.reverse();

				if (ifStraight[0] - ifStraight[4] == 4) {
					ifStraight.splice(5, 2);
				} else if (ifStraight[2] - ifStraight[6] == 4) {
					ifStraight.splice(0, 2);
				} else if (ifStraight[1] - ifStraight[5] == 4) {
					ifStraight.splice(0, 1); ifStraight.splice(6, 1);
				} else {
					ifStraight = new Array;
				}

				if (ifStraight.length > 4) {
					hand = 'straightFlush';
				} else {
					testFourkind();
				}
			}
		} else {
			testFourkind();
		}
	};


	testFourkind = () => {

		emptyArrays(); split(); cardValue.sort(); toInteger();

		for (let i = 0; i < cardNumbers.length; i++) {
			if (cardNumbers[i] == cardNumbers[i + 3]) {
				sameValue.push(cardNumbers[i]);
			}
		}

		if (sameValue.length == 1) {
			hand = 'fourKind';
		} else {
			testFullHouse();
		}

	};


	testFullHouse = () => {

		emptyArrays(); split(); cardValue.sort().reverse(); toInteger();

		for (let i = 0; i < cardNumbers.length; i++) {
			if (cardNumbers[i] == cardNumbers[i + 2]) {
				sameValue.push(cardNumbers[i]);
			}
		}

		if (sameValue.length >= 1) {

			sameValue.splice(1, 1);

			for (let i = 0; i < cardNumbers.length; i++) {
				if (cardNumbers[i] == cardNumbers[i + 1] &&
					cardNumbers[i] !== sameValue[0]) {
					sameValue.push(cardNumbers[i]);
				}
			}

			if (sameValue.length >= 2) {
				hand = 'fullHouse';
			} else {
				testFlush();
			}

		}
		else {
			testFlush();
		}
	};


	testFlush = () => {

		emptyArrays(); pushSuits();

		if (suit.length == 1) {

			cardValue.sort().reverse(); toInteger();

			console.log(cardValue)

			if (cardValue.indexOf('a') !== -1) {
				hand = 'flushAce';
			} else {
				hand = 'flush';
			}

		} else {
			testStraight();
		}
	};


	testStraight = () => {

		emptyArrays(); split(); cardValue.sort(); toInteger();

		if (cardNumbers.indexOf(1) !== -1
			&& cardNumbers.indexOf(10) !== -1
			&& cardNumbers.indexOf(11) !== -1
			&& cardNumbers.indexOf(12) !== -1
			&& cardNumbers.indexOf(13) !== -1) {
			hand = 'straightAce';
		} else {

			for (let i = 0; i < cardNumbers.length; i++) {
				if (cardNumbers[i] !== cardNumbers[i + 1]) {
					numbersUnique.push(cardNumbers[i])
				}
			}

			for (let i = 0; i < numbersUnique.length; i++) {
				if (numbersUnique[i + 1] == numbersUnique[i] + 1 || numbersUnique[i] - 1 == numbersUnique[i - 1]) {
					ifStraight.push(numbersUnique[i]);
				}
			}

			ifStraight.reverse();

			if (ifStraight[0] - ifStraight[4] == 4) {
				ifStraight.splice(0,0);
			} else if (ifStraight[1] - ifStraight[5] == 4) {
				ifStraight.splice(0, 1);
			} else if (ifStraight[2] - ifStraight[6] == 4) {
				ifStraight.splice(0, 2);
			} else if (ifStraight[3] -ifStraight[7] == 4) {
				ifStraight.splice(0,3);
			} else {
				ifStraight = new Array;
			}

			if (ifStraight.length > 4) {
				hand = 'straight';
			} else if 
				(jortModeOn == 'ON') {
				testLittleStraight();
			} else {
				testThreeKind();
			}
		}
	};

	testLittleStraight=()=> {


		emptyArrays(); split(); cardValue.sort(); toInteger();

		if (cardNumbers.indexOf(1) !== -1
			&& cardNumbers.indexOf(11) !== -1
			&& cardNumbers.indexOf(12) !== -1
			&& cardNumbers.indexOf(13) !== -1) {
			hand = 'littleStraightAce';
		} else {

			for (let i = 0; i < cardNumbers.length; i++) {
				if (cardNumbers[i] !== cardNumbers[i + 1]) {
					numbersUnique.push(cardNumbers[i])
				}
			}

			for (let i = 0; i < numbersUnique.length; i++) {
				if (numbersUnique[i + 1] == numbersUnique[i] + 1 || numbersUnique[i] - 1 == numbersUnique[i - 1]) {
					ifStraight.push(numbersUnique[i]);
				}
			}

			ifStraight.reverse();

			if (ifStraight[0] - ifStraight[3] == 3) {
				ifStraight.splice(0,0)
			} else if (ifStraight[1] - ifStraight[4] == 3) {
				ifStraight.splice(0, 1);
			} else if (ifStraight[2] - ifStraight[5] == 3) {
				ifStraight.splice(0, 2);
			} else if (ifStraight[3] - ifStraight[6] == 3) {
				ifStraight.splice(0,3);
			} else if (ifStraight[4] - ifStraight[7] == 3) {
				ifStraight.splice(0,4)
			} else {
				ifStraight = new Array;
			}


			if (ifStraight.length > 3) {
				hand = 'littleStraight'; 
			} else {
				testThreeKind();
			}
		}

	};

	testThreeKind = () => {

		emptyArrays(); split(); cardValue.sort().reverse(); toInteger();

		for (let i = 0; i < cardNumbers.length; i++) {
			if (cardNumbers[i] == cardNumbers[i + 2]) {
				sameValue.push(cardNumbers[i]);
			}
		}

		if (sameValue.length == 1) {
			hand = 'threeKind';
		} else {
			testTwoPair();
		}
	};


	testTwoPair = () => {

		emptyArrays(); split(); cardValue.sort().reverse(); toInteger();

		for (let i = 0; i < cardNumbers.length; i++) {
			if (cardNumbers[i] == cardNumbers[i + 1]) {
				sameValue.push(cardNumbers[i]);
			}
		}

		for (let i = 0; i < cardNumbers.length; i++) {
			if (cardNumbers[i] == cardNumbers[i + 1] && cardNumbers[i] !== sameValue[0]) {
				sameValue.push(cardNumbers[i]);
			}
		}

		if (sameValue.indexOf(1) != -1 && sameValue.length > 1) {
			hand = 'twoPairAce';
		} else if (sameValue.length > 1) {
			hand = 'twoPair';
		} else {
			testPocketPair();
		}
	};


	testPocketPair = () => {

		emptyArrays(); split(); toInteger();

		if (cardNumbers[0] == cardNumbers[1]) {
			hand = 'pocketPair';
		} else {
			testPair();
		}
	};


	testPair = () => {

		emptyArrays(); split(); toInteger(); cardNumbers.sort();

		for (let i = 0; i < cardNumbers.length; i++) {
			if (cardNumbers[i] == cardNumbers[i + 1]) {
				sameValue.push(cardNumbers[i]);
			}
		}

		if (sameValue.length > 0) {
			hand = 'pair';
		} else {
			testHighCard();
		}
	};


	testHighCard = () => {

		emptyArrays(); split(); cardValue.sort().reverse(); toInteger();

		if (cardNumbers.indexOf(1) !== -1) {
			hand = 'highCardAce';
		} else {
			hand = 'highCard';
		}
	};


	testStraightFlush();

	displayHand = new Array;

	fiftyHandsArr = new Array;


	let a = cardNumbers.indexOf(1); if (a > -1) { cardNumbers[a] = 'Ace' }
	let b = cardNumbers.indexOf(11); if (b > -1) { cardNumbers[b] = 'Jack' }
	let c = cardNumbers.indexOf(12); if (c > -1) { cardNumbers[c] = 'Queen' }
	let d = cardNumbers.indexOf(13); if (d > -1) { cardNumbers[d] = 'King' }

	let e = sameValue.indexOf(1); if (e > -1) { sameValue[e] = 'Ace' }
	let f = sameValue.indexOf(11); if (f > -1) { sameValue[f] = 'Jack' }
	let g = sameValue.indexOf(12); if (g > -1) { sameValue[g] = 'Queen' }
	let h = sameValue.indexOf(13); if (h > -1) { sameValue[h] = 'King' }

	let i = ifStraight.indexOf(1); if (i > -1) { ifStraight[i] = 'Ace' }
	let j = ifStraight.indexOf(11); if (j > -1) { ifStraight[j] = 'Jack' }
	let k = ifStraight.indexOf(12); if (k > -1) { ifStraight[k] = 'Queen' }
	let l = ifStraight.indexOf(13); if (l > -1) { ifStraight[l] = 'King' }

	let m = cardSuit.indexOf('S'); if (m > -1) { cardSuit[m] = 'Spades' }
	let n = cardSuit.indexOf('C'); if (n > -1) { cardSuit[n] = 'Clubs' }
	let o = cardSuit.indexOf('H'); if (o > -1) { cardSuit[o] = 'Hearts' }
	let p = cardSuit.indexOf('D'); if (p > -1) { cardSuit[p] = 'Diamonds' }


	switch (hand) {
		case 'royalFlush':
			displayHand = `!! A royal flush of ${suit} !!`
			vue1.royalFlush++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('royalFlush')
			break;
		case 'straightFlush':
			displayHand = `!! A straight flush of ${suit}, ${ifStraight[0]} high !!`
			vue1.straightFlush++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('straightFlush')
			break;
		case 'fourKind':
			displayHand = `!! Four-of-a-kind ${sameValue[0]}'s !!`
			vue1.fourKind++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('fourKind')
			break;
		case 'fullHouse':
			displayHand = `!! A full house, ${sameValue[0]}'s over ${sameValue[1]}'s !!`
			vue1.fullHouse++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('fullHouse')
			break;
		case 'flushAce':
			displayHand = `!! A Flush of ${cardSuit[0]}, Ace high !!`
			vue1.flush++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('flush')
			break;
		case 'flush':
			displayHand = `!! A Flush of ${cardSuit[0]}, ${cardNumbers[0]} high !!`
			vue1.flush++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('flush')
			break;
		case 'straightAce':
			displayHand = `!! A Straight, Ace high !!`
			vue1.straight++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('straight')
			break;
		case 'straight':
			displayHand = `!! A Straight, ${ifStraight[0]} high !!`
			vue1.straight++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('straight')
			break;
		case 'littleStraightAce':
			displayHand = `!! A Little Straight (Jort-Straight), Ace high !!`
			vue1.littleStraight++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('littleStraight')
			break;
		case 'littleStraight':
			displayHand = `!! A Little Straight (Jort-Straight), ${ifStraight[0]} high !!`
			vue1.littleStraight++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('littleStraight')
			break;
		case 'threeKind':
			displayHand = `!! Three-of-a-kind ${sameValue[0]}'s !!`
			vue1.threeKind++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('threeKind')
			break;
		case 'twoPairAce':
			displayHand = `!! Two pair Ace's and ${sameValue[0]}'s !!`
			vue1.twoPair++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('twoPair')
			break;
		case 'twoPair':
			displayHand = `!! Two pair ${sameValue[0]}'s and ${sameValue[1]}'s !!`
			vue1.twoPair++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('twoPair')
			break;
		case 'pocketPair':
			displayHand = `!! A pocketpair of ${cardNumbers[0]}'s !!`
			vue1.pair++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('pair')
			break;
		case 'pair':
			displayHand = `!! A pair of ${sameValue[0]}'s !!`
			vue1.pair++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('pair')
			break;
		case 'highCard':
			displayHand = `!! High card ${cardNumbers[0]} !!`
			vue1.highCard++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('highCard')
			break;
		case 'highCardAce':
			displayHand = `!! High card Ace !!`
			vue1.highCard++
			vue1.totalRounds++
			vue1.rounds++
			fiftyHandsArr.push('highCard')
			break;
	}

	document.getElementById("hand").innerHTML = displayHand;
};