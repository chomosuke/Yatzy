import { allEqual } from './helpers/allEqual';
import { Category } from './Category';
import { sum } from './helpers/sum';
import { count } from './helpers/count';

export function score(roll: number[], category: Category): number {
    switch (category) {
        case Category.Chance:
            return sum(roll);
        case Category.Yatzy:
            return allEqual(roll) ? 50 : 0;
        case Category.Ones:
            return count(roll, 1);
        case Category.Twos:
            return count(roll, 2);
        case Category.Threes:
            return count(roll, 3);
        default:
            return 0;
    }
}
