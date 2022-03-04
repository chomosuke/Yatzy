import { allEqual } from './allEqual';
import { Category } from './Category';
import { sum } from './sum';

export function score(roll: number[], category: Category): number {
    switch (category) {
        case Category.Chance:
            return sum(roll);
        case Category.Yatzy:
            return allEqual(roll) ? 50 : 0;
        default:
            return 0;
    }
}
