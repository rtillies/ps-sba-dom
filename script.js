const playingCard = document.getElementById('playing-card')
const cardHistory = document.querySelector('#history')

const suits = ['spade', 'diamond', 'club', 'heart']
const ranks = ['joker', 'ace', 'deuce', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']


console.log(playingCard);
console.log(cardHistory);
// console.log(cardHistory.children.length);

// let myCard = generateCardImage()
// let cardWords = parseCardToWords(myCard)
// addHistory(cardWords)
// changeCard(myCard, cardWords)

// console.log(myCard);
// console.log(cardWords);

playingCard.addEventListener('click', function() {
    changeCard()
})

function changeCard(event) {
    let card = generateCardImage()
    // let card = 'spade_12_queen.png'
    let words = parseCardToWords(card)    
    
    playingCard.setAttribute('src', `cards/${card}`)
    playingCard.setAttribute('alt', words)
    addHistory(words)
    // return 0
}


function addHistory(card) {
    // remove active class from current active item
    const activeItem = document.querySelector('.list-group-item.active')
    activeItem.classList.remove('active')

    // create new list item
    const li = document.createElement('li')
    li.textContent = card
    li.classList.add('list-group-item')
    li.classList.add('active')

    // add new item to add to history
    cardHistory.prepend(li)

    console.log(cardHistory.children.length);
    if(cardHistory.children.length > 10) {
        let lastChild = cardHistory.lastElementChild;
        console.log(lastChild);
        cardHistory.removeChild(lastChild)
    }

}

// for (let i = 0; i < 10; i++) {
//     let myCard = generateCardImage()
//     let cardWords = parseCardToWords(myCard)

//     console.log(myCard);
//     console.log(cardWords);
// }


function generateCardImage() {
    let randomRank = Math.floor(Math.random() * 14)
    let randomSuit = Math.floor(Math.random() * 4)
    let rrr = ranks[randomRank]

    // console.log(randomRank, ranks[randomRank]); // 0-13
    // console.log(randomSuit, suits[randomSuit]); // 0-4
    // console.log(randomRank, randomSuit);

    if (randomRank == 0) {
        if (randomSuit % 2) // 1 or 3
            return `${rrr}_big.png`;
        else                // 0 or 2
            return `${rrr}_little.png`;
    } else {
        let rr = randomRank < 10 ? '0' + randomRank : randomRank
        let srs = suits[randomSuit]
        return `${srs}_${rr}_${rrr}.png`;
    }
}

function parseCardToWords(image) {
    let parts = image.split('_')
    let lastPart = parts[parts.length - 1]
    let rank = lastPart.split('.')[0]
    parts[parts.length - 1] = rank
    
    // console.log(`parts: ${parts}`);
    // console.log(lastPart);
    // console.log(rank);

    // if (image.startsWith('joker')) {
    //     if (image.includes('big')) {
    if (parts[0] == 'joker') {
        if (parts[1] == 'big') {
            return 'Big Joker'
        } else {
            return 'Little Joker'
        }
    } else {
        return `${parts[2]} of ${parts[0]}s`
    }
}