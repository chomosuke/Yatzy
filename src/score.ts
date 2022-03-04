import { Category } from './Category';
import { sum } from './sum';

export function score(roll: number[], category: Category): number {
    return sum(roll);
}
