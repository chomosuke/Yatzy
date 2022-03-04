import { allEqual } from './helpers/allEqual';
import { Category } from './Category';
import { sum } from './helpers/sum';
import { assertUnreachable } from './helpers/assertUnreachable';
import { Roll } from './Roll';
import { countArray } from './helpers/count';

export function score(roll: Roll, category: Category): number {
    switch (category) {
        case Category.Chance:
            return sum(roll);
        case Category.Yatzy:
            return allEqual(roll) ? 50 : 0;
        case Category.Ones:
        case Category.Twos:
        case Category.Threes:
        case Category.Fours:
        case Category.Fives:
        case Category.Sixes:
            return sum(roll.filter((e) => e === categoryToNum(category)));
        case Category.Pair:
            return scoreNPairs(roll, 1);
        case Category.TwoPairs:
            return scoreNPairs(roll, 2);
        case Category.ThreeOfAKind:
            return scoreNOfAKind(roll, 3);
        case Category.FourOfAKind:
            return scoreNOfAKind(roll, 4);
        case Category.SmallStraight:
            return scoreStraight(roll, 1);
        case Category.LargeStraight:
            return scoreStraight(roll, 2);
        case Category.FullHouse:
            return scoreFullHouse(roll);
        default:
            return 0;
    }
}

function categoryToNum(
    category:
    Category.Ones |
    Category.Twos |
    Category.Threes |
    Category.Fours |
    Category.Fives |
    Category.Sixes,
): number {
    switch (category) {
        case Category.Ones:
            return 1;
        case Category.Twos:
            return 2;
        case Category.Threes:
            return 3;
        case Category.Fours:
            return 4;
        case Category.Fives:
            return 5;
        case Category.Sixes:
            return 6;
        default:
            return assertUnreachable(category);
    }
}

function scoreNPairs(roll: Roll, n: number): number {
    const allPairs = Array.from(countArray(roll).entries())
        // map [value, count] to [...values] where value is the value of one
        // pair
        .map(([value, count]) => Array(Math.floor(count / 2)).fill(value))
        // convert the array from [[...values], [...values]] to
        // [...values, ...values]
        .flat();
    if (allPairs.length < n) {
        return 0;
    }
    return sum(
        allPairs
            // get the largest n pairs
            .sort((a, b) => b - a)
            .slice(0, n),
    ) * 2; // sum the value and * 2
}

function scoreNOfAKind(roll: Roll, n: number): number {
    const counts = countArray(roll);
    for (const [value, count] of counts.entries()) {
        if (count >= n) {
            return value * n;
        }
    }
    return 0;
}

function scoreStraight(roll: Roll, start: number): number {
    roll.sort();
    for (let i = 0; i < roll.length; i++) {
        if (roll[i] !== i + start) {
            return 0;
        }
    }
    return sum(roll);
}

function scoreFullHouse(roll: Roll): number {
    const counts = Array.from(countArray(roll).entries());
    if (counts[0][1] in [2, 3, 5] && counts.length <= 2) {
        return sum(roll);
    }
    return 0;
}
