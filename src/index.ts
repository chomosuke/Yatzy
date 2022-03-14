/* eslint-disable no-await-in-loop */
import { read } from './helpers/readlinePromise';
import { play } from './play';
import { HumanPlayer } from './players/HumanPlayer';

async function main() {
    let again = true;
    while (again) {
        await play([new HumanPlayer('Player 1'), new HumanPlayer('Player 2')]);
        const input = await read('Would you like to play again? (y/n)');
        again = input.length > 0 && input[0] === 'y';
    }
}

main();
