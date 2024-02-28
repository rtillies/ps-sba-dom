const playingCard = document.getElementById('playing-card')
const cardHistory = document.querySelector('#history')
const form = document.querySelector('form')
const header = document.querySelector('.page-header')

const player = form.elements['playerName'];
const email = form.elements['playerEmail'];
const checkbox = form.elements['referralCheck'];
const code = form.elements['referralCode'];
const submitBtn = form.elements['submit-btn'];
let newsText = document.querySelector('newsletter-text')

const suits = ['spade', 'diamond', 'club', 'heart']
const ranks = ['joker', 'ace', 'deuce', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']

// console.log(playingCard);
// console.log(cardHistory);
// console.log(form);
// console.log(header);
// console.log(getBrowser());
getBrowser();
// console.log(window);
// console.log(window.navigator.appCodeName);
// console.log(window.navigator.appName);
// console.log(window.navigator.appVersion);
// console.log(window.screen);

function getBrowser() {
  const appVersion = window.navigator.appVersion.split(' ')
  const version = 
    (appVersion[appVersion.length - 1]) + ' | ' +
    (appVersion[appVersion.length - 2])

  const browser = document.createElement('p')
  browser.innerHTML = `
    <strong>Browser:</strong> 
    ${window.navigator.appCodeName} | 
    ${window.navigator.appName} | 
    ${version}`
  
  header.append(browser)
}

// toggleReferralCodeField();
// console.log(cardHistory.children.length);

// let myCard = generateCardImage()
// let cardWords = parseCardToWords(myCard)
// addHistory(cardWords)
// changeCard(myCard, cardWords)

// console.log(myCard);
// console.log(cardWords);

playingCard.addEventListener('click', changeCard)
// playingCard.addEventListener('click', function() {
//   changeCard()
// })

checkbox.addEventListener('click', toggleReferralCodeField)
// checkbox.addEventListener('click', function(event) {
//   toggleReferralCodeField()
// })

// submitBtn.addEventListener('click', validate)
submitBtn.addEventListener('click', validate)
// form.addEventListener('submit', function(event) {
//   validate()
// })

function validate(evt) {
  const nameVal = validateName();
  const emailVal = validateEmail();
  const codeVal = validateCode();

  if (!nameVal || !emailVal || codeVal === false) {
    evt.returnValue = false;
    return false;
  }

  console.log(nameVal, emailVal, codeVal);

  let alertText = `
    SUCCESS!
    
    Thanks for signing up, ${nameVal}!
    Check your ${emailVal} inbox for this week's newsletter.

    Referral Code: ${codeVal || 'n/a'}`

  window.alert(alertText)
  // newsText.textContent = 'Newsletter sent!'
  // let newsText = document.querySelector('newsletter-text')

  // const success = document.createElement('p')
  // success.textContent = `Congratulations ${nameVal}! ${emailVal}`
  // form.appendChild(success)

  // return true;
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

function validateCode() {
  if (checkbox.checked && code.value === "") {
    alert("Please provide a referral code or uncheck the box.");
    code.focus();
    return false;
  } else if (isNaN(Number(code.value))) {
    alert("Referral code must be a number");
    code.focus();
    return false;
  } else {
    return code.value;
  }
}

function changeCard(event) {
    let card = generateCardImage()
    let words = parseCardToWords(card)    
    
    playingCard.setAttribute('src', `cards/${card}`)
    playingCard.setAttribute('alt', words)
    addHistory(words)
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
  if (checkbox.checked) {
    console.log("Unlock referral field");
    // console.log(code);
    code.disabled = false
  } else {
    console.log("LOCK referral field");
    // console.log(code);
    code.disabled = true
    code.value = ''
  }
}

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