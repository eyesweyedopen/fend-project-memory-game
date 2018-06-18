/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

const cardTypeList = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const matchList = [];

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("timer").innerHTML = "<p>00:00</p>";
    document.querySelector(".deck").innerHTML = '';
    // initialize move counter to 0
    document.querySelector(".moves").innerHTML = 0;

    createGrid();
});


// *** main stream

// initiate timer
document.querySelector(".container").addEventListener("mousedown", timer, {once: true});

document.querySelector(".deck").addEventListener("click", matchCards, true);

// reset
document.querySelector(".restart").addEventListener("click", function() {
    location.reload();
})

function matchCards(evt) {

    const card = evt.target.parentElement;

    if (!card.classList.contains("match")) {
        evt.stopPropagation();
        evt.preventDefault();
        showCard(card);
        moveCounter();
        matchList.push(card);
        console.log(matchList);

        if (matchList.length == 2) {
            if (matchList[0].innerHTML == matchList[1].innerHTML) {
                matchList.forEach(function(el) {
                    el.classList.toggle("match");
                });

            } else {
                matchList.forEach(function(el) {
                    setTimeout(function() {
                        el.classList.toggle("show");
                        el.classList.toggle("open");
                    }, 1000);
                });
            };

            matchList.length = 0;
        };
    };

};

function moveCounter() {
    const moves = document.querySelector(".moves").innerHTML;

    let moveNum = Number(moves);
    moveNum = moveNum + 1;
    console.log(moves);

    document.querySelector(".moves").innerHTML = moveNum.toString();
}

function createCard(classNames) {
    const myEl = document.createElement("li");
    myEl.innerHTML = 
    `<i class="${classNames}"></i><div class="clickCover"></div>`;
    myEl.classList.add("card");
    console.log(myEl);

    return myEl;
};

function createGrid() {
    const frag = document.createDocumentFragment();

    shuffle(cardTypeList);

    for (let i = 0; i < cardTypeList.length; i++) {
        let card = createCard(cardTypeList[i]);
        frag.appendChild(card);
    };

    document.querySelector(".deck").appendChild(frag);
};

function showCard(el) {
    if (el.nodeName === "LI") {
        el.classList.toggle("show");
        el.classList.toggle("open");
    };
};

// create timer
function timer() {
	const timer = document.getElementById("timer");

	const startTime = new Date().getTime();

	setInterval(function() {
		const curTime = new Date().getTime();

		const minutes = Math.floor( ( (curTime - startTime) % (1000 * 60 * 60) ) / (1000 * 60) );
		const seconds = Math.floor( ( (curTime - startTime) % (1000 * 60) ) / 1000);

		timer.innerHTML = `<p>${pad(minutes)}:${pad(seconds)}</p>`
	}, 1000);
};

// create pad for timer
function pad(num) {
	num = "0".repeat(2 - num.toString().length) + num.toString();
	return num;
};




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
