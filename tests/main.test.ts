/* eslint-disable no-restricted-syntax */
import { HumanPlayer } from '../src/players/HumanPlayer';
import { ComputerPlayer } from '../src/players/ComputerPlayer';
import { Player } from '../src/players/Player';
import { testReadConsole } from './testConsole';
import { main } from '../src/main';
import { play } from '../src/play';
import { read } from '../src/helpers/readlinePromise';

jest.mock('../src/play');

const mockPlay = play as jest.Mock<Promise<void>, [Player[]]>;

jest.mock('../src/helpers/readlinePromise');

global.console.log = jest.fn<undefined, [string]>();

const mockLog = global.console.log as jest.Mock<undefined, [string]>;
const mockRead = read as jest.Mock<Promise<string>, [string?]>;

describe('main', () => {
    it.each<[string, string[], string, string, Player[], number]>([
        [
            '1 human 1 computer play once',
            [
                '2',
                'h',
                'Richard',
                'c',
                'Chey',
                'n',
            ],
            `
Number of players: 
Player No.1 is: (h -> human/c -> computer)
Player No.1's name: 
Player No.2 is: (h -> human/c -> computer)
Player No.2's name: 
Would you like to play again? (y/n)`,
            '',
            [
                new HumanPlayer('Richard'),
                new ComputerPlayer('Chey'),
            ],
            1,
        ],
    ])('%s', async (_description, userInput, readPrompt, consoleOutput, players, playTimes) => {
        await testReadConsole(
            userInput,
            readPrompt,
            consoleOutput,
            main,
            mockRead,
            mockLog,
        );
        expect(mockPlay).toBeCalledTimes(playTimes);
        expect(mockPlay).toBeCalledWith(players);
    });
});
