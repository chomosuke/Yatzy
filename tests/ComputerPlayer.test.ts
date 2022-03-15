/* eslint-disable no-restricted-syntax */
import { Category } from '../src/Category';
import { ComputerPlayer } from '../src/players/ComputerPlayer';
import { Roll } from '../src/Roll';
import { testConsole } from './testConsole';

global.console.log = jest.fn<undefined, [string]>();

const mockLog = global.console.log as jest.Mock<undefined, [string]>;

describe('ComputerPlayer', () => {
    describe('choose category with max score', () => {
        it.each<[Roll, Category, Category[]]>([
            [
                [1, 1, 1, 1, 1],
                Category.Yatzy,
                [
                    Category.Chance,
                    Category.Ones,
                    Category.Yatzy,
                ],
            ],
        ])('For roll: %o, should choose category: %s out of %o', async (roll, category, categories) => {
            const playerName = 'Player 1';
            await testConsole(
                'ComputerPlayer',
                async () => {
                    expect(await new ComputerPlayer(playerName).getCategory(roll, categories))
                        .toStrictEqual(category);
                },
                mockLog,
            );
        });
    });

    // the other two functions are random, therefore a bit pointless to test them.
});
