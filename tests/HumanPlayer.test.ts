/* eslint-disable no-restricted-syntax */
import { Decision, Decisions } from '../src/Decisions';
import { Category } from '../src/Category';
import { HumanPlayer } from '../src/players/HumanPlayer';
import { Roll } from '../src/Roll';
import { read } from '../src/helpers/readlinePromise';

jest.mock('../src/helpers/readlinePromise');

global.console.log = jest.fn<undefined, [string]>();

const mockLog = global.console.log as jest.Mock<undefined, [string]>;
const mockRead = read as jest.Mock<Promise<string>, [string?]>;

describe('A HumanPlayer taking in user input to make decisions', () => {
    beforeEach(() => {
        mockLog.mockReset();
        mockRead.mockReset();
    });

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
Player 1 has rolled 1, 2, 3, 4, 5.`,
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
Player 1 has rolled 1, 2, 3, 4, 5.`,
                [Decision.Hold, Decision.Hold, Decision.ReRoll, Decision.ReRoll, Decision.Hold],
            ],
        ])('%s', async (_description, playerName, roll, userInput, readPrompt, consoleOutput, decisions) => {
            const player = new HumanPlayer(playerName);

            mockRead.mockImplementation(async (_) => userInput.shift()!);

            expect(await player.getDecisions(roll)).toStrictEqual(decisions);

            expect(`\n${mockLog.mock.calls.map((e) => e[0]).join('\n')}`).toStrictEqual(consoleOutput);
            expect(`\n${mockRead.mock.calls.map((e) => e[0]).join('\n')}`).toStrictEqual(readPrompt);
        });
    });

    describe('choose category', () => {
        it.each<[string, string, Roll, string[], string, string, Category]>([
            [
                'Chance',
                'Player 11',
                [1, 2, 3, 4, 5],
                ['Chance'],
                `
Place in category (press h to show options): `,
                '',
                Category.Chance,
            ],
        ])('%s', async (_description, playerName, roll, userInput, readPrompt, consoleOutput, category) => {
            const player = new HumanPlayer(playerName);

            mockRead.mockImplementation(async (_) => userInput.shift()!);

            expect(await player.getCategory(roll)).toStrictEqual(category);

            expect(`\n${mockLog.mock.calls.map((e) => e[0]).join('\n')}`).toStrictEqual(consoleOutput);
            expect(`\n${mockRead.mock.calls.map((e) => e[0]).join('\n')}`).toStrictEqual(readPrompt);
        });
    });
});
