import { score } from '../src/score';
import { Category } from '../src/Category';

describe('score a given roll with a given category correctly', () => {
    it.each([
        { roll: [1, 2, 3, 4, 5], category: Category.Chance, expected: 15 },
        { roll: [1, 1, 3, 3, 6], category: Category.Chance, expected: 14 },
        { roll: [4, 5, 5, 6, 1], category: Category.Chance, expected: 21 },
        { roll: [1, 1, 1, 1, 1], category: Category.Yatzy, expected: 50 },
    ])(
        'roll $roll in category $category should score $expected.',
        ({
            roll,
            category,
            expected,
        }: {
            roll: number[];
            category: Category;
            expected: number;
        }) => {
            expect(score(roll, category)).toStrictEqual(expected);
        },
    );
});
