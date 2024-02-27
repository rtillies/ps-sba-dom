const playingCard = document.getElementById('playing-card')
const cardHistory = document.querySelector('#history')
const form = document.querySelector('form')
const player = form.elements['playerName'];
const email = form.elements['playerEmail'];
const checkbox = form.elements['referralCheck'];
const code = form.elements['referralCode'];


const suits = ['spade', 'diamond', 'club', 'heart']
const ranks = ['joker', 'ace', 'deuce', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']


console.log(playingCard);
console.log(cardHistory);
console.log(form);
// toggleReferralCodeField();
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

form.addEventListener('click', function(event) {
  toggleReferralCodeField()
})

form.addEventListener('submit', validate)

// function submitForm() {

// }

function validate(evt) {

  const nameVal = validateName();
  if (nameVal === false) {
    evt.returnValue = false;
    return false;
  }

  const emailVal = validateEmail();
  if (emailVal === false) {
    evt.returnValue = false;
    return false;
  }

  const referVal = validateRefer();
  if (referVal === false) {
    evt.returnValue = false;
    return false;
  }

  alert(
    `Name: ${nameVal}
    Email: ${emailVal}
    Referral: ${checkbox.checked}
    Refer Code: ${referVal.toUpperCase()}`
  );

  return true;
}

function validateName() {
  if (player.value === "") {
    alert("Please provide a name.");
    player.focus();
    return false;
  }
  return player.value;
}

function validateEmail() {
  if (email.value === "") {
    alert("Please provide an email address.");
    email.focus();
    return false;
  }
  return email.value;
}

function validateRefer() {
  if (checkbox.checked && code.value === "") {
    alert("Please provide a referral code or uncheck the box.");
    code.focus();
    return false;
  }
  return code.value;
}



function changeCard(event) {
    let card = generateCardImage()
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

    // limit history list to 10 items
    console.log(cardHistory.children.length);
    if (cardHistory.children.length > 10) {
        let lastChild = cardHistory.lastElementChild;
        console.log(lastChild);
        cardHistory.removeChild(lastChild)
    }
}

function toggleReferralCodeField() {
  const checkbox = document.querySelector('#referralCheck')
  const referralCodeField = document.querySelector('#referralCode')
  console.log(checkbox);
  console.log(referralCodeField);
  console.log(checkbox.checked);
  if (checkbox.checked) {
    console.log("Unlock referral field");
    console.log(referralCodeField);
    referralCodeField.disabled = false
  } else {
    console.log("LOCK referral field");
    console.log(referralCodeField);
    referralCodeField.disabled = true
    referralCodeField.value = ''
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