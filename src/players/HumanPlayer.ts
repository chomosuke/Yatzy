import { Decision, Decisions, ensureDecisions } from '../Decisions';
import { Player } from './Player';
import { Roll } from '../Roll';
import ordinal from 'ordinal';
import { read } from '../helpers/readlinePromise';

export class HumanPlayer extends Player {
    private name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    async getDecisions(roll: Roll): Promise<Decisions> {
        console.log(`${this.name} has rolled ${roll.join(', ')}.`);
        const decisions: Decision[] = [];
        for (let i = 0; i < roll.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            let input = await read(`Hold or re-roll for the ${ordinal(i + 1)} dice (current: ${roll[i]})? h/r:`);
            while (!['r', 'h'].includes(input)) {
                // eslint-disable-next-line no-await-in-loop
                input = await read('Please type h for hold and r for re-roll.');
            }
            decisions.push(input === 'r' ? Decision.ReRoll : Decision.Hold);
        }
        return ensureDecisions(decisions);
    }
}
