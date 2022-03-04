import { score } from '../src/score';
import { Category } from '../src/Category';

describe('score a given roll with a given category', () => {
    it.each([
        [[1, 2, 3, 4, 5], Category.Chance, 15],
        [[1, 1, 3, 3, 6], Category.Chance, 14],
        [[4, 5, 5, 6, 1], Category.Chance, 21],
        [[1, 1, 1, 1, 1], Category.Yatzy, 50],
        [[1, 1, 1, 2, 1], Category.Yatzy, 0],
        [[1, 1, 1, 2, 1], Category.Ones, 4],
        [[3, 3, 3, 4, 5], Category.Ones, 0],
        [[1, 1, 1, 2, 1], Category.Twos, 2],
        [[2, 3, 2, 5, 1], Category.Twos, 4],
        [[1, 3, 3, 2, 1], Category.Threes, 6],
        [[4, 4, 3, 4, 1], Category.Fours, 12],
        [[1, 1, 2, 4, 4], Category.Fours, 8],
        [[5, 5, 5, 5, 5], Category.Fives, 25],
        [[1, 4, 3, 2, 5], Category.Sixes, 0],
        [[3, 3, 3, 4, 4], Category.Pair, 8],
    ])(
        'roll $roll in category $category should score $expected.',
        (
            roll: number[],
            category: Category,
            expected: number,
        ) => {
            expect(score(roll, category)).toStrictEqual(expected);
        },
    );
});
