/* eslint-disable no-restricted-syntax */
import { Decision, Decisions } from '../src/Decisions';
import { Category } from '../src/Category';
import { HumanPlayer } from '../src/players/HumanPlayer';
import { Roll } from '../src/Roll';
import { read } from '../src/helpers/readlinePromise';
import { testConsole } from './testConsole';

jest.mock('../src/helpers/readlinePromise');

global.console.log = jest.fn<undefined, [string]>();

const mockLog = global.console.log as jest.Mock<undefined, [string]>;
const mockRead = read as jest.Mock<Promise<string>, [string?]>;

describe('A HumanPlayer taking in user input to make decisions', () => {
    describe('hold or re-roll', () => {
        it.each<[string, string, Roll, string[], string, string, Decisions]>([
            [
                'hold some and reroll some others',
                'Player 1',
                [1, 2, 3, 4, 5],
                ['h', 'h', 'r', 'r', 'h'],
                `
Hold or re-roll for the 1st dice (current: 1)? h/r:
Hold or re-roll for the 2nd dice (current: 2)? h/r:
Hold or re-roll for the 3rd dice (current: 3)? h/r:
Hold or re-roll for the 4th dice (current: 4)? h/r:
Hold or re-roll for the 5th dice (current: 5)? h/r:`,
                `
`,
                [Decision.Hold, Decision.Hold, Decision.ReRoll, Decision.ReRoll, Decision.Hold],
            ],
            [
                'get some input wrong',
                'Player 1',
                [1, 2, 3, 4, 5],
                ['h', 'h', 'y', 'r', 'r', 'something', 'j', 'h'],
                `
Hold or re-roll for the 1st dice (current: 1)? h/r:
Hold or re-roll for the 2nd dice (current: 2)? h/r:
Hold or re-roll for the 3rd dice (current: 3)? h/r:
Please type h for hold and r for re-roll:
Hold or re-roll for the 4th dice (current: 4)? h/r:
Hold or re-roll for the 5th dice (current: 5)? h/r:
Please type h for hold and r for re-roll:
Please type h for hold and r for re-roll:`,
                `
`,
                [Decision.Hold, Decision.Hold, Decision.ReRoll, Decision.ReRoll, Decision.Hold],
            ],
        ])('%s', async (_description, playerName, roll, userInput, readPrompt, consoleOutput, decisions) => {
            await testConsole(
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
        it.each<[string, string, Roll, string[], string, string, Category]>([
            [
                'choose Chance',
                'Player 11',
                [1, 2, 3, 4, 5],
                ['Chance'],
                `
Place roll in category: `,
                `
Player 11 has rolled 1, 2, 3, 4, 5.`,
                Category.Chance,
            ],
            [
                'choose FullHouse',
                'Player 11',
                [1, 2, 3, 4, 5],
                ['FullHouse'],
                `
Place roll in category: `,
                `
Player 11 has rolled 1, 2, 3, 4, 5.`,
                Category.FullHouse,
            ],
            [
                'typo once',
                'Player 11',
                [1, 2, 3, 4, 5],
                ['FulHouse', 'FullHouse'],
                `
Place roll in category: 
Category not recognized, please try again (press h to list all categories): `,
                `
Player 11 has rolled 1, 2, 3, 4, 5.`,
                Category.FullHouse,
            ],
            [
                'typo many times',
                'Player 11',
                [1, 2, 3, 4, 5],
                ['FulHouse', 'e', 'Fuse', 'FullHouse'],
                `
Place roll in category: 
Category not recognized, please try again (press h to list all categories): 
Category not recognized, please try again (press h to list all categories): 
Category not recognized, please try again (press h to list all categories): `,
                `
Player 11 has rolled 1, 2, 3, 4, 5.`,
                Category.FullHouse,
            ],
            [
                'list all categories',
                'Player 11',
                [1, 2, 3, 4, 5],
                ['FulHouse', 'h', 'FullHouse'],
                `
Place roll in category: 
Category not recognized, please try again (press h to list all categories): 
Place roll in category: `,
                `
Player 11 has rolled 1, 2, 3, 4, 5.
Chance
Yatzy
Ones
Twos
Threes
Fours
Fives
Sixes
Pair
TwoPairs
ThreeOfAKind
FourOfAKind
SmallStraight
LargeStraight
FullHouse`,
                Category.FullHouse,
            ],
        ])('%s', async (_description, playerName, roll, userInput, readPrompt, consoleOutput, category) => {
            await testConsole(
                userInput,
                readPrompt,
                consoleOutput,
                async () => {
                    expect(await new HumanPlayer(playerName).getCategory(roll))
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
                `
ppp has rolled 1, 3, 2, 4, 5.`,
                true,
            ],
            [
                'not ending',
                'ppp',
                [1, 3, 2, 4, 5],
                ['n'],
                `
Would you like to end your turn? (y/n)`,
                `
ppp has rolled 1, 3, 2, 4, 5.`,
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
ppp has rolled 1, 3, 2, 4, 5.
Unrecognized input, please type "y" or "n".`,
                false,
            ],
        ])('%s', async (_description, playerName, roll, userInput, readPrompt, consoleOutput, ending) => {
            await testConsole(
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
});
