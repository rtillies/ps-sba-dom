const suits = ['spade', 'diamond', 'club', 'heart']
const ranks = ['joker', 'ace', 'deuce', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']

console.log(generateCardImage());


function generateCardImage() {
    let randomRank = Math.floor(Math.random() * 14)
    let randomSuit = Math.floor(Math.random() * 4)

    // console.log(randomRank, ranks[randomRank]); // 0-13
    // console.log(randomSuit, suits[randomSuit]); // 0-4

    let rr = randomRank < 10 ? '0' + randomRank : randomRank
    let rrr = ranks[randomRank]
    let srs = suits[randomSuit]

    // console.log(`${srs}_${rr}_${rrr}.png`);
    return `${srs}_${rr}_${rrr}.png`;
}