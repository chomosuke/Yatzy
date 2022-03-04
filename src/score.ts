import { allEqual } from './helpers/allEqual';
import { Category } from './Category';
import { sum } from './helpers/sum';
import { count } from './helpers/count';
import { assertUnreachable } from './helpers/assertUnreachable';

export function score(roll: number[], category: Category): number {
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
            return count(roll, categoryToNum(category));
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
