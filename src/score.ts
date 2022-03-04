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
            return scorePair(roll);
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

function scorePair(roll: Roll): number {
    return Math.max(
        ...Array.from(countArray(roll).entries()) // Array of count of all identical value of roll
            .filter(([_value, count]) => count >= 2) // only retain the value with count more than 2
            .map(([value, _count]) => value), // remove map [value, count] to value
    ) * 2; // highest value that appeared more than 2 times * 2
}
