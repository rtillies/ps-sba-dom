const suits = ['spade', 'diamond', 'club', 'heart']
const ranks = ['joker', 'ace', 'deuce', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']

for (let i = 0; i < 10; i++) {
    console.log(generateCardImage());
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