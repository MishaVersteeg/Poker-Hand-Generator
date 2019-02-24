
let deck = ['Sa', 'Sb', 'Sc', 'Sd', 'Se', 'Sf', 'Sg', 'Sh', 'Si', 'Sj', 'Sk', 'Sl', 'Sm', 'Ca', 'Cb', 'Cc', 'Cd', 'Ce', 'Cf', 'Cg', 'Ch', 'Ci', 'Cj', 'Ck', 'Cl', 'Cm', 'Ha', 'Hb', 'Hc', 'Hd', 'He', 'Hf', 'Hg', 'Hh', 'Hi', 'Hj', 'Hk', 'Hl', 'Hm', 'Da', 'Db', 'Dc', 'Dd', 'De', 'Df', 'Dg', 'Dh', 'Di', 'Dj', 'Dk', 'Dl', 'Dm']

let holeCards = []; 
let flop = []; 
let turn = []; 
let river = []; 
let eightCard = []; 
let hand = [];

let eightCardOn = 'OFF'
let jortModeOn = 'OFF'

// retreive and give back cards to deck array:

triggerCards = (arrayType) => {
	deck = deck.concat(arrayType)
	arrayType.length = 0

	// if (arrayType == holeCards || arrayType == flop || arrayType == turn || arrayType == river || arrayType == eightCard) {
	// 	a = arrayType.pop(); deck.push(a);
	// } if (arrayType == holeCards || arrayType == flop) {
	// 	a = arrayType.pop(); deck.push(a);
	// } if (arrayType == flop) {
	// 	a = arrayType.pop(); deck.push(a);
	// }

	deck.sort(function (a, b) { return 0.5 - Math.random() });

	if (arrayType == holeCards) {
		arrayType = deck.splice(0, 2);
		return arrayType;
	}

	if (arrayType == flop) {
		arrayType = deck.splice(0, 3);
		return arrayType;
	}

	if (arrayType == turn || arrayType == river || arrayType == eightCard) {
		arrayType = deck.splice(0, 1);
		return arrayType;
	}
};

// ----

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


showEightCard = () => {

	if (eightCardOn == 'ON') {
		eightCard = triggerCards(eightCard);

		document.getElementById("eightCardJPG0").src = "cards/" + eightCard[0] + ".jpg";
	} else {
		document.getElementById("eightCardJPG0").src = ""
	}
};


showAllCards = () => {

	dealHoleCards();
	showAllSharedCards();
};


showAllSharedCards = () => {

	showFlop();
	showTurn();
	showRiver();
	showEightCard();
};


resetDeck = () => {

	handCount.data = []
	myLineChart.data.datasets[0].data = [0]

	handCount.highCard = 0
	handCount.pair = 0
	handCount.twoPair = 0
	handCount.threeKind = 0
	handCount.littleStraight = 0
	handCount.straight = 0
	handCount.flush = 0
	handCount.fullHouse = 0
	handCount.fourKind = 0
	handCount.straightFlush = 0
	handCount.royalFlush = 0
	handCount.totalRounds = 0

	deck.push(holeCards.pop());
	deck.push(holeCards.pop());
	deck.push(flop.pop());
	deck.push(flop.pop());
	deck.push(flop.pop());
	deck.push(turn.pop());
	deck.push(river.pop());

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

// Bar-chart:

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

	myLineChart.data.datasets[0].data[0]  =  handCount.highCard;
	myLineChart.data.datasets[0].data[1]  =  handCount.pair;
	myLineChart.data.datasets[0].data[2]  =  handCount.twoPair;
	myLineChart.data.datasets[0].data[3]  =  handCount.littleStraight;
	myLineChart.data.datasets[0].data[4]  =  handCount.threeKind;
	myLineChart.data.datasets[0].data[5]  =  handCount.straight;
	myLineChart.data.datasets[0].data[6]  =  handCount.flush;
	myLineChart.data.datasets[0].data[7]  =  handCount.fullHouse;
	myLineChart.data.datasets[0].data[8]  =  handCount.fourKind;
	myLineChart.data.datasets[0].data[9]  =  handCount.straightFlush;
	myLineChart.data.datasets[0].data[10] =  handCount.royalFlush;

	myLineChart.update();
}, 50)

let myLineChart = Chart.Bar(canvas, { data: data, });


// Vue component for table count

handCount = new Vue({
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
});

// logic to determine value hand: 


determineHand = () => { 

	let allCards = holeCards.concat(flop, turn, river, eightCard);

	let spades = [];
	let clubs = [];
	let hearts = [];
	let diamonds = [];

	let cardSuit = [];
	let cardValue = [];
	let suit = [];
	let cardNumbers = [];
	let numbersUnique = [];
	let possibleStraightCards = [];
	let sameValue = [];


	emptyArrays = () => {

		spades = [];
		clubs = [];
		hearts = [];
		diamonds = [];

		cardSuit = [];
		cardValue = [];
		suit = [];
		cardNumbers = [];
		numbersUnique = [];
		possibleStraightCards = [];
		sameValue = [];
	};

	pushSameSuits = () => { 

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

		pushSameSuits();

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
						possibleStraightCards.push(cardNumbers[i]);
					}
				}

				possibleStraightCards.reverse();

				if (possibleStraightCards[0] - possibleStraightCards[4] == 4) {
					possibleStraightCards.splice(5, 2);
				} else if (possibleStraightCards[2] - possibleStraightCards[6] == 4) {
					possibleStraightCards.splice(0, 2);
				} else if (possibleStraightCards[1] - possibleStraightCards[5] == 4) {
					possibleStraightCards.splice(0, 1); possibleStraightCards.splice(6, 1);
				} else {
					possibleStraightCards = [];
				}

				if (possibleStraightCards.length > 4) {
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

		emptyArrays(); 
		split(); 
		cardValue.sort(); 
		toInteger();

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

		emptyArrays(); 
		split(); 
		cardValue.sort().reverse(); 
		toInteger();

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

		emptyArrays(); 
		pushSameSuits();

		if (suit.length == 1) {

			cardValue.sort().reverse(); toInteger();

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

		emptyArrays(); 
		split(); 
		cardValue.sort(); 
		toInteger();

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
					possibleStraightCards.push(numbersUnique[i]);
				}
			}

			possibleStraightCards.reverse();

			if (possibleStraightCards[0] - possibleStraightCards[4] == 4) {
				possibleStraightCards.splice(0,0);
			} else if (possibleStraightCards[1] - possibleStraightCards[5] == 4) {
				possibleStraightCards.splice(0, 1);
			} else if (possibleStraightCards[2] - possibleStraightCards[6] == 4) {
				possibleStraightCards.splice(0, 2);
			} else if (possibleStraightCards[3] -possibleStraightCards[7] == 4) {
				possibleStraightCards.splice(0,3);
			} else {
				possibleStraightCards = [];
			}

			if (possibleStraightCards.length > 4) {
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

		emptyArrays(); 
		split(); 
		cardValue.sort(); 
		toInteger();

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
					possibleStraightCards.push(numbersUnique[i]);
				}
			}

			possibleStraightCards.reverse();

			if (possibleStraightCards[0] - possibleStraightCards[3] == 3) {
				possibleStraightCards.splice(0,0)
			} else if (possibleStraightCards[1] - possibleStraightCards[4] == 3) {
				possibleStraightCards.splice(0, 1);
			} else if (possibleStraightCards[2] - possibleStraightCards[5] == 3) {
				possibleStraightCards.splice(0, 2);
			} else if (possibleStraightCards[3] - possibleStraightCards[6] == 3) {
				possibleStraightCards.splice(0,3);
			} else if (possibleStraightCards[4] - possibleStraightCards[7] == 3) {
				possibleStraightCards.splice(0,4)
			} else {
				possibleStraightCards = [];
			}


			if (possibleStraightCards.length > 3) {
				hand = 'littleStraight'; 
			} else {
				testThreeKind();
			}
		}

	};


	testThreeKind = () => {

		emptyArrays(); 
		split(); 
		cardValue.sort().reverse(); 
		toInteger();

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

		emptyArrays(); 
		split(); 
		cardValue.sort().reverse(); 
		toInteger();

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

		emptyArrays(); 
		split(); 
		toInteger();

		if (cardNumbers[0] == cardNumbers[1]) {
			hand = 'pocketPair';
		} else {
			testPair();
		}
	};


	testPair = () => {

		emptyArrays(); 
		split(); 
		toInteger(); 
		cardNumbers.sort();

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

		emptyArrays(); 
		split(); 
		cardValue.sort().reverse(); 
		toInteger();

		if (cardNumbers.indexOf(1) !== -1) {
			hand = 'highCardAce';
		} else {
			hand = 'highCard';
		}
	};


	testStraightFlush();

	displayHand = [];

	let a = cardNumbers.indexOf(1); if (a > -1) { cardNumbers[a] = 'Ace' }
	let b = cardNumbers.indexOf(11); if (b > -1) { cardNumbers[b] = 'Jack' }
	let c = cardNumbers.indexOf(12); if (c > -1) { cardNumbers[c] = 'Queen' }
	let d = cardNumbers.indexOf(13); if (d > -1) { cardNumbers[d] = 'King' }

	let e = sameValue.indexOf(1); if (e > -1) { sameValue[e] = 'Ace' }
	let f = sameValue.indexOf(11); if (f > -1) { sameValue[f] = 'Jack' }
	let g = sameValue.indexOf(12); if (g > -1) { sameValue[g] = 'Queen' }
	let h = sameValue.indexOf(13); if (h > -1) { sameValue[h] = 'King' }

	let i = possibleStraightCards.indexOf(1); if (i > -1) { possibleStraightCards[i] = 'Ace' }
	let j = possibleStraightCards.indexOf(11); if (j > -1) { possibleStraightCards[j] = 'Jack' }
	let k = possibleStraightCards.indexOf(12); if (k > -1) { possibleStraightCards[k] = 'Queen' }
	let l = possibleStraightCards.indexOf(13); if (l > -1) { possibleStraightCards[l] = 'King' }

	let m = cardSuit.indexOf('S'); if (m > -1) { cardSuit[m] = 'Spades' }
	let n = cardSuit.indexOf('C'); if (n > -1) { cardSuit[n] = 'Clubs' }
	let o = cardSuit.indexOf('H'); if (o > -1) { cardSuit[o] = 'Hearts' }
	let p = cardSuit.indexOf('D'); if (p > -1) { cardSuit[p] = 'Diamonds' }


	switch (hand) {
		case 'royalFlush':
			displayHand = `!! A royal flush of ${suit} !!`
			handCount.royalFlush++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'straightFlush':
			displayHand = `!! A straight flush of ${suit}, ${possibleStraightCards[0]} high !!`
			handCount.straightFlush++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'fourKind':
			displayHand = `!! Four-of-a-kind ${sameValue[0]}'s !!`
			handCount.fourKind++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'fullHouse':
			displayHand = `!! A full house, ${sameValue[0]}'s over ${sameValue[1]}'s !!`
			handCount.fullHouse++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'flushAce':
			displayHand = `!! A Flush of ${cardSuit[0]}, Ace high !!`
			handCount.flush++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'flush':
			displayHand = `!! A Flush of ${cardSuit[0]}, ${cardNumbers[0]} high !!`
			handCount.flush++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'straightAce':
			displayHand = `!! A Straight, Ace high !!`
			handCount.straight++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'straight':
			displayHand = `!! A Straight, ${possibleStraightCards[0]} high !!`
			handCount.straight++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'littleStraightAce':
			displayHand = `!! A Little Straight (Jort-Straight), Ace high !!`
			handCount.littleStraight++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'littleStraight':
			displayHand = `!! A Little Straight (Jort-Straight), ${possibleStraightCards[0]} high !!`
			handCount.littleStraight++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'threeKind':
			displayHand = `!! Three-of-a-kind ${sameValue[0]}'s !!`
			handCount.threeKind++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'twoPairAce':
			displayHand = `!! Two pair Ace's and ${sameValue[0]}'s !!`
			handCount.twoPair++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'twoPair':
			displayHand = `!! Two pair ${sameValue[0]}'s and ${sameValue[1]}'s !!`
			handCount.twoPair++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'pocketPair':
			displayHand = `!! A pocketpair of ${cardNumbers[0]}'s !!`
			handCount.pair++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'pair':
			displayHand = `!! A pair of ${sameValue[0]}'s !!`
			handCount.pair++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'highCard':
			displayHand = `!! High card ${cardNumbers[0]} !!`
			handCount.highCard++
			handCount.totalRounds++
			handCount.rounds++
			break;
		case 'highCardAce':
			displayHand = `!! High card Ace !!`
			handCount.highCard++
			handCount.totalRounds++
			handCount.rounds++
			break;
	}

	document.getElementById("hand").innerHTML = displayHand;
};
