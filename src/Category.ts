export enum Category {
    Chance = 'Chance',
    Yatzy = 'Yatzy',
    Ones = 'Ones',
    Twos = 'Twos',
    Threes = 'Threes',
    Fours = 'Fours',
    Fives = 'Fives',
    Sixes = 'Sixes',
    Pair = 'Pair',
    TwoPairs = 'TwoPairs',
    ThreeOfAKind = 'ThreeOfAKind',
    FourOfAKind = 'FourOfAKind',
    SmallStraight = 'SmallStraight',
    LargeStraight = 'LargeStraight',
    FullHouse = 'FullHouse',
}

export function listAllCategories() {
    for (const category of Object.values(Category)) {
        console.log(category);
    }
}
