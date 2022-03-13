/* eslint-disable no-await-in-loop */
import ordinal from 'ordinal';
import { Category, listAllCategories } from '../Category';
import { Decision, Decisions, ensureDecisions } from '../Decisions';
import { Player } from './Player';
import { Roll } from '../Roll';
import { read } from '../helpers/readlinePromise';

export class HumanPlayer extends Player {
    private name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    private showStatus(roll: Roll) {
        console.log(`${this.name} has rolled ${roll.join(', ')}.`);
    }

    async getDecisions(roll: Roll): Promise<Decisions> {
        this.showStatus(roll);
        const decisions: Decision[] = [];
        for (let i = 0; i < roll.length; i++) {
            let input = await read(`Hold or re-roll for the ${ordinal(i + 1)} dice (current: ${roll[i]})? h/r:`);
            while (!['r', 'h'].includes(input)) {
                input = await read('Please type h for hold and r for re-roll:');
            }
            decisions.push(input === 'r' ? Decision.ReRoll : Decision.Hold);
        }
        return ensureDecisions(decisions);
    }

    async getCategory(roll: Roll): Promise<Category> {
        this.showStatus(roll);
        let input = await read('Place roll in category: ');
        // eslint-disable-next-line no-constant-condition
        while (true) {
            for (const category of Object.values(Category)) {
                if (input === category) {
                    return category;
                }
            }
            input = await read('Category not recognized, please try again (press h to list all categories): ');
            if (input === 'h') {
                listAllCategories();
                input = await read('Place roll in category: ');
            }
        }
    }
}
