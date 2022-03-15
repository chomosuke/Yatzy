/* eslint-disable no-await-in-loop */
import { range } from './helpers/range';
import { readWithValidation } from './helpers/readWithValidation';
import { read } from './helpers/readlinePromise';
import { play } from './play';
import { HumanPlayer } from './players/HumanPlayer';
import { ComputerPlayer } from './players/ComputerPlayer';

export async function main() {
    let again = true;
    while (again) {
        const players = [];
        const n = parseInt(await readWithValidation(
            'Number of players: ',
            'Please input a number.',
            (v) => !Number.isNaN(parseInt(v, 10)),
        ), 10);
        for (const i of range(n)) {
            const humanComputer = await readWithValidation(
                `Player No.${i + 1} is: (h -> human/c -> computer)`,
                'Please type one of "h" or "c".',
                (v) => ['h', 'c'].includes(v),
            );
            const name = await read(`Player No.${i + 1}'s name: `);
            players.push(humanComputer === 'h' ? new HumanPlayer(name) : new ComputerPlayer(name));
        }

        await play(players);
        const input = await read('Would you like to play again? (y/n)');
        again = input.length > 0 && input[0] === 'y';
    }
}
