import { score } from '../src/score';
import { Category } from '../src/Category';

describe('score a given roll with a given category correctly', () => {
    it.each([
    ])('roll $roll in category $category should score $expected.', (roll: number[], category: Category, expected: number) => {
        expect(score(roll, category)).toStrictEqual(expected);
    });
});
