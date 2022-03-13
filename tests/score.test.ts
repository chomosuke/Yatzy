import { Category } from '../src/Category';
import { Roll } from '../src/Roll';
import { score } from '../src/score';

describe('score a given roll with a given category', () => {
    it.each<[Roll, Category, number]>([
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
        [[1, 1, 6, 2, 6], Category.Pair, 12],
        [[3, 3, 3, 4, 1], Category.Pair, 6],
        [[3, 3, 3, 3, 1], Category.Pair, 6],
        [[1, 1, 2, 3, 3], Category.TwoPairs, 8],
        [[1, 1, 2, 3, 4], Category.TwoPairs, 0],
        [[1, 1, 2, 2, 2], Category.TwoPairs, 6],
        [[3, 3, 3, 4, 5], Category.ThreeOfAKind, 9],
        [[3, 3, 4, 5, 6], Category.ThreeOfAKind, 0],
        [[3, 3, 3, 3, 1], Category.ThreeOfAKind, 9],
        [[2, 2, 2, 2, 5], Category.FourOfAKind, 8],
        [[2, 2, 2, 5, 5], Category.FourOfAKind, 0],
        [[2, 2, 2, 2, 2], Category.FourOfAKind, 8],
        [[3, 1, 4, 5, 2], Category.SmallStraight, 15],
        [[3, 6, 4, 5, 2], Category.SmallStraight, 0],
        [[3, 6, 4, 5, 2], Category.LargeStraight, 20],
        [[3, 6, 3, 5, 2], Category.LargeStraight, 0],
        [[1, 1, 2, 2, 2], Category.FullHouse, 8],
        [[2, 2, 3, 3, 4], Category.FullHouse, 0],
        [[4, 4, 4, 4, 4], Category.FullHouse, 0],
        [[4, 4, 4, 2, 4], Category.FullHouse, 0],
        [[4, 4, 4, 2, 2], Category.FullHouse, 16],
    ])(
        'roll %p with category %s should score %i.',
        (roll: Roll, category: Category, expected: number) => {
            expect(score(roll, category)).toStrictEqual(expected);
        },
    );
});
