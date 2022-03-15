/* eslint-disable no-restricted-syntax */
import { Decision, Decisions } from '../src/Decisions';
import { Category } from '../src/Category';
import { HumanPlayer } from '../src/players/HumanPlayer';
import { Roll } from '../src/Roll';
import { read } from '../src/helpers/readlinePromise';
import { testReadConsole } from './testConsole';

jest.mock('../src/helpers/readlinePromise');

global.console.log = jest.fn<undefined, [string]>();

const mockLog = global.console.log as jest.Mock<undefined, [string]>;
const mockRead = read as jest.Mock<Promise<string>, [string?]>;

describe('HumanPlayer', () => {
    describe('hold or re-roll', () => {
        it.each<[string, string, Roll, string[], string, string, Decisions]>([
            [
                'hold some and reroll some others',
                'Player 1',
                [1, 2, 3, 4, 5],
                ['h', 'h', 'r', 'r', 'h'],
                `
Hold or re-roll for the 1st dice (current: 1)? (h/r)
Hold or re-roll for the 2nd dice (current: 2)? (h/r)
Hold or re-roll for the 3rd dice (current: 3)? (h/r)
Hold or re-roll for the 4th dice (current: 4)? (h/r)
Hold or re-roll for the 5th dice (current: 5)? (h/r)`,
                '',
                [Decision.Hold, Decision.Hold, Decision.ReRoll, Decision.ReRoll, Decision.Hold],
            ],
            [
                'get some input wrong',
                'Player 1',
                [1, 2, 3, 4, 5],
                ['h', 'h', 'y', 'r', 'r', 'something', 'j', 'h'],
                `
Hold or re-roll for the 1st dice (current: 1)? (h/r)
Hold or re-roll for the 2nd dice (current: 2)? (h/r)
Hold or re-roll for the 3rd dice (current: 3)? (h/r)
Hold or re-roll for the 3rd dice (current: 3)? (h/r)
Hold or re-roll for the 4th dice (current: 4)? (h/r)
Hold or re-roll for the 5th dice (current: 5)? (h/r)
Hold or re-roll for the 5th dice (current: 5)? (h/r)
Hold or re-roll for the 5th dice (current: 5)? (h/r)`,
                `
Please type h for hold and r for re-roll.
Please type h for hold and r for re-roll.
Please type h for hold and r for re-roll.`,
                [Decision.Hold, Decision.Hold, Decision.ReRoll, Decision.ReRoll, Decision.Hold],
            ],
        ])('%s', async (_description, playerName, roll, userInput, readPrompt, consoleOutput, decisions) => {
            await testReadConsole(
                userInput,
                readPrompt,
                consoleOutput,
                async () => {
                    expect(await new HumanPlayer(playerName).getDecisions(roll))
                        .toStrictEqual(decisions);
                },
                mockRead,
                mockLog,
            );
        });
    });

    describe('choose category', () => {
        it.each<[string, string, Roll, Category[], string[], string, string, Category]>([
            [
                'choose one category',
                'Player 11',
                [1, 2, 3, 4, 5],
                [Category.Chance],
                ['Chance'],
                `
Place roll in category: `,
                '',
                Category.Chance,
            ],
            [
                'choose another category',
                'Player 11',
                [1, 2, 3, 4, 5],
                [
                    Category.Chance,
                    Category.FullHouse,
                    Category.Fives,
                ],
                ['FullHouse'],
                `
Place roll in category: `,
                '',
                Category.FullHouse,
            ],
            [
                'typo once',
                'Player 11',
                [1, 2, 3, 4, 5],
                [
                    Category.Chance,
                    Category.FullHouse,
                    Category.Fives,
                ],
                ['FulHouse', 'FullHouse'],
                `
Place roll in category: 
Category not recognized, please try again (press h to list all available categories): `,
                '',
                Category.FullHouse,
            ],
            [
                'typo many times',
                'Player 11',
                [1, 2, 3, 4, 5],
                [Category.FullHouse],
                ['FulHouse', 'e', 'Fuse', 'FullHouse'],
                `
Place roll in category: 
Category not recognized, please try again (press h to list all available categories): 
Category not recognized, please try again (press h to list all available categories): 
Category not recognized, please try again (press h to list all available categories): `,
                '',
                Category.FullHouse,
            ],
            [
                'list all available categories',
                'Player 11',
                [1, 2, 3, 4, 5],
                [
                    Category.Chance,
                    Category.Yatzy,
                    Category.Ones,
                    Category.Twos,
                    Category.Threes,
                    Category.Fives,
                    Category.Sixes,
                    Category.Pair,
                    Category.TwoPairs,
                    Category.ThreeOfAKind,
                    Category.SmallStraight,
                    Category.LargeStraight,
                    Category.FullHouse,
                ],
                ['FulHouse', 'h', 'FullHouse'],
                `
Place roll in category: 
Category not recognized, please try again (press h to list all available categories): 
Place roll in category: `,
                `
Chance
Yatzy
Ones
Twos
Threes
Fives
Sixes
Pair
TwoPairs
ThreeOfAKind
SmallStraight
LargeStraight
FullHouse`,
                Category.FullHouse,
            ],
            [
                'valid but not avialable category once',
                'Player 11',
                [1, 2, 3, 4, 5],
                [
                    Category.FullHouse,
                    Category.Fives,
                ],
                ['Chance', 'FullHouse'],
                `
Place roll in category: 
Category not recognized, please try again (press h to list all available categories): `,
                '',
                Category.FullHouse,
            ],
            [
                'press h the first time',
                'penPineappleApplePen',
                [1, 2, 3, 4, 5],
                [
                    Category.Fives,
                    Category.FullHouse,
                ],
                ['h', 'FullHouse'],
                `
Place roll in category: 
Place roll in category: `,
                `
Fives
FullHouse`,
                Category.FullHouse,
            ],
            [
                'press h the first & second time',
                'penPineappleApplePen',
                [1, 2, 3, 4, 5],
                [
                    Category.Fives,
                    Category.FullHouse,
                ],
                ['h', 'h', 'FullHouse'],
                `
Place roll in category: 
Place roll in category: 
Place roll in category: `,
                `
Fives
FullHouse
Fives
FullHouse`,
                Category.FullHouse,
            ],
        ])('%s', async (_description, playerName, roll, categories, userInput, readPrompt, consoleOutput, category) => {
            await testReadConsole(
                userInput,
                readPrompt,
                consoleOutput,
                async () => {
                    expect(await new HumanPlayer(playerName).getCategory(roll, categories))
                        .toStrictEqual(category);
                },
                mockRead,
                mockLog,
            );
        });
    });

    describe('ending turn', () => {
        it.each<[string, string, Roll, string[], string, string, boolean]>([
            [
                'ending',
                'ppp',
                [1, 3, 2, 4, 5],
                ['y'],
                `
Would you like to end your turn? (y/n)`,
                '',
                true,
            ],
            [
                'not ending',
                'ppp',
                [1, 3, 2, 4, 5],
                ['n'],
                `
Would you like to end your turn? (y/n)`,
                '',
                false,
            ],
            [
                'wrong input',
                'ppp',
                [1, 3, 2, 4, 5],
                ['blabla', 'n'],
                `
Would you like to end your turn? (y/n)
Would you like to end your turn? (y/n)`,
                `
Unrecognized input, please type "y" or "n".`,
                false,
            ],
        ])('%s', async (_description, playerName, roll, userInput, readPrompt, consoleOutput, ending) => {
            await testReadConsole(
                userInput,
                readPrompt,
                consoleOutput,
                async () => {
                    expect(await new HumanPlayer(playerName).endTurn(roll)).toStrictEqual(ending);
                },
                mockRead,
                mockLog,
            );
        });
    });

    it('Show score', async () => {
        await testReadConsole(
            [],
            '',
            `
ppup's score: 54`,
            async () => {
                new HumanPlayer('ppup').printScore(54);
            },
            mockRead,
            mockLog,
        );
    });

    it('Show new score', async () => {
        await testReadConsole(
            [],
            '',
            `
ppup scored 54 more points.`,
            async () => {
                new HumanPlayer('ppup').printScoreGained(54);
            },
            mockRead,
            mockLog,
        );
    });

    it('Show roll', async () => {
        await testReadConsole(
            [],
            '',
            `
penpineappleapplepen has rolled 2, 1, 1, 2, 4.`,
            async () => {
                new HumanPlayer('penpineappleapplepen').printRoll([2, 1, 1, 2, 4]);
            },
            mockRead,
            mockLog,
        );
    });

    it('print winning', async () => {
        await testReadConsole(
            [],
            '',
            `
penpineappleapplepen wins with a score of 541.`,
            async () => {
                new HumanPlayer('penpineappleapplepen').printWinningMessage(541);
            },
            mockRead,
            mockLog,
        );
    });
});
