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

/*
 * data constructs
 */ 

const cardTypeList = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
const matched = [];
const matchList = [];
const starCount = [];
const flipTracker = {};

// animation checker variable
let animating = false;



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



document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("timer").innerHTML = "<p>00:00</p>";
    document.querySelector(".deck").innerHTML = '';

    createGrid();
});


/*
 *
 * main stream
 * 
 */ 

// initiate timer
document.querySelector(".container").addEventListener("mousedown", timer, {once: true});

// initiate star rating
starRating();

// initiate rating decrementor
document.querySelector(".container").addEventListener("mousedown", decreaseStars, {once: true});

// initiate grid
document.querySelector(".deck").addEventListener("click", matchCards, true);

// reset
document.querySelector(".restart").addEventListener("click", function() {
    location.reload();
});

/*
 * FUNCTIONS
 */ 

function matchCards(evt) {

    const card = evt.target.parentElement;

    if (!card.classList.contains("match") && card.nodeName != "DIV") {
        evt.stopPropagation();
        evt.preventDefault();
        if (animating === false) {

            showCard(card);
            moveCounter();
            matchList.push(card);
            console.log(card);

            // flip incrementor for star rating ****TO BE ADDED****
            // const cardFlips = Number(card.getAttribute("flips"));
            // card.setAttribute("flips", cardFlips + 1);
    
            if (matchList.length == 2) {
                if (matchList[0].innerHTML == matchList[1].innerHTML && !(matchList[0] === matchList[1])) {
                    matchList.forEach(function(el) {
                        el.classList.toggle("match");
                        matched.push(el);
                        console.log(matched);
                    });
    
                } else {
                    matchList.forEach(function(el) {
                        setTimeout(function() {
                            el.classList.toggle("show");
                            el.classList.toggle("open");
                            el.classList.toggle("no-match");
                            animating = false;
                        }, 1000);
    
                        animating = true;
                        el.classList.toggle("no-match");
                    });
                };
    
                matchList.length = 0;
                console.log(matched.length);
    
                //end game
                if (matched.length == 16) {
                    endGame();
                };
            };

        };
    };

};

function moveCounter() {
    const moves = document.querySelector(".moves").innerHTML;

    let moveNum = Number(moves);
    moveNum = moveNum + 1;

    document.querySelector(".moves").innerHTML = moveNum.toString();
}

function createCard(classNames) {
    const myEl = document.createElement("li");
    myEl.innerHTML = 
    `<i class="${classNames}"></i><div class="clickCover" flips="0"></div>`;
    myEl.classList.add("card");

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

// star rating system
function starRating() {
    const stars = document.querySelector(".stars");

    const frag = document.createDocumentFragment();
    for (let i = 0; i < 5; i++) {
        const star = document.createElement("li");
        star.innerHTML = `<i class="fa fa-star"></i>`;
        starCount.push(star);
        for (let star of starCount) {
            frag.appendChild(star);
        };
    };

    stars.appendChild(frag);
};

function decreaseStars() {
    const stars = document.querySelector(".stars");

        const interval = setInterval(function() {

            if (stars.children.length == 1) {
                clearInterval(interval);
            };

            stars.style.display = "none";
            stars.removeChild(stars.querySelector("li"));
            stars.style.display = "inline-block";
        }, 30000);
};

/* 
 * display modals
 */

// introModal
document.addEventListener("DOMContentLoaded", introModalDisplay);

function introModalDisplay() {
    const modal = document.querySelector("#introModal");
    const back = document.querySelector(".backCover");
    modal.style.display = "flex";
    back.style.display = "block";

    const btn = modal.querySelector(".modal-footer");
    btn.addEventListener("click", function() {
        modal.style.display = "none";
        back.style.display = "none";
        document.removeEventListener("DOMContentLoaded", introModalDisplay);
    });
};

//endModal
function endGame() {
    const modal = document.querySelector("#endModal");
    const back = document.querySelector(".backCover");
    modal.style.display = "flex";
    back.style.display = "block";

    const moves = document.querySelector(".moves").innerHTML;
    const time = `${document.querySelector("#timer").innerHTML.substr(3, 2)} minutes and ${document.querySelector("#timer").innerHTML.substr(6, 2)} seconds`;
    const starRating = document.querySelector(".stars").children.length.toString();

    modal.querySelector(".modal-body").innerHTML = `<p>You matched all cards in ${moves} moves over ${time} with a rating of ${starRating} out of 5 stars!<p><p>Thanks for playing!<p>`

    const btn = modal.querySelector(".modal-footer");
    btn.addEventListener("click", function() {
        location.reload();
    });
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
