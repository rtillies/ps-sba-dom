const playingCard = document.getElementById('playing-card')
const cardHistory = document.querySelector('#history')
const form = document.querySelector('form')
const header = document.querySelector('.page-header')
const newsletter = document.querySelector('#newsletter')

const player = form.elements['playerName'];
const email = form.elements['playerEmail'];
const checkbox = form.elements['referralCheck'];
const code = form.elements['referralCode'];
const submitBtn = form.elements['submit-btn'];

const suits = ['spade', 'diamond', 'club', 'heart']
const ranks = ['joker', 'ace', 'deuce', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']

// Display browser information on the page
displayBrowser();
// updateNewsletterPanel();

// Event listeners
playingCard.addEventListener('click', changeCard)
checkbox.addEventListener('click', toggleReferralCode)
submitBtn.addEventListener('click', validate)

// Get browser info from window.navigator object
function displayBrowser() {
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

// Validate full form
function validate(evt) {
  const nameVal = validateName();
  const emailVal = validateEmail();
  const codeVal = validateCode();

  if (!nameVal || !emailVal || codeVal === false) {
    evt.returnValue = false;
    return false;
  }

  // console.log(nameVal, emailVal, codeVal);
  let alertText = `
    SUCCESS!
    
    Thanks for signing up, ${nameVal}!
    Check your ${emailVal} inbox for this week's newsletter.

    Referral Code: ${codeVal || 'n/a'}`

  // window.alert(alertText)
  // updateNewsletterPanel(name, email, code)
  updateNewsletterPanel(nameVal, emailVal, codeVal);


  // newsText.textContent = 'Newsletter sent!'
  // let newsText = document.querySelector('newsletter-text')

  // const success = document.createElement('p')
  // success.textContent = `Congratulations ${nameVal}! ${emailVal}`
  // form.appendChild(success)

  // return true;

}

function updateNewsletterPanel(name, email, code) {
  // const headline = newsletter.getElementsByTagName('h4')[0]
  const headline = newsletter.firstElementChild
  const text = newsletter.getElementsByClassName('newsletter-text')[0]
  const form = newsletter.getElementsByTagName('form')[0]
  headline.textContent += ' Sent!'
  // console.log(headline);
  // console.log(form);
  // form.remove()
  form.hidden = true

  // const panelHTML = document.createElement('div')

  text.innerHTML = `
  <h5>SUCCESS!</h5>
  
  <p>
  Thanks for signing up, <b>${name}</b>!<br />
  </p>

  <p>
  Check your <b>${email}</b> inbox for this week's newsletter.
  </p>

  <p>
  Referral Code: <b>${code || 'n/a'}</b>
  </p>`

  // console.log(panelHTML)
  // newsletter.append(panelHTML)
}

// Validate name field
function validateName() {
  if (player.value === "") {
    alert("Please provide a name.");
    player.focus();
    return false;
  } else {
    const nameParts = player.value.split(' ') 
    if (nameParts.length < 2) {
      alert("Please enter your first and last name.");
      player.focus();
      return false;
    } else if (player.length < 4) {
      alert("Please enter more than just your initials.");
      player.focus();
      return false;
    }
  }
  return player.value;
}

// Validate email field
// Email field also has HTML attribute validation
function validateEmail() {
  if (email.value === "") {
    alert("Please provide an email address.");
    email.focus();
    return false;
  }
  return email.value;
}

// Validate referral code field
// Disabled until checkbox is checked
  // Cannot be blank
  // Must contain only digits
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

// Change playing card in browser
function changeCard(event) {
    let card = getRandomCard()
    let words = parseCardToWords(card)    
    
    playingCard.setAttribute('src', `cards/${card}`)
    playingCard.setAttribute('alt', words)
    addHistory(words)
}

// Add card details to history panel
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
    if (cardHistory.children.length > 10) {
        let lastChild = cardHistory.lastElementChild;
        console.log(lastChild);
        cardHistory.removeChild(lastChild)
    }
}

// enable/disable referral code based on checkbox
function toggleReferralCode() {
  if (checkbox.checked) {
    code.disabled = false
  } else {
    code.disabled = true
    code.value = ''
  }
}

// get random playing card
function getRandomCard() {
    let randomRank = Math.floor(Math.random() * 14)
    let randomSuit = Math.floor(Math.random() * 4)
    let rrr = ranks[randomRank]

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

// describe playing card in words
// e.g. "deuce of spades", "king of diamonds"
function parseCardToWords(image) {
    let parts = image.split('_')
    let lastPart = parts[parts.length - 1]
    let rank = lastPart.split('.')[0]
    parts[parts.length - 1] = rank
    
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