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

    // eslint-disable-next-line class-methods-use-this
    async getDecisions(roll: Roll): Promise<Decisions> {
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

    async endTurn(roll: Roll): Promise<boolean> {
        this.showStatus(roll);
        let input = await read('Would you like to end your turn? (y/n)');
        while (!['y', 'n'].includes(input)) {
            console.log('Unrecognized input, please type "y" or "n".');
            input = await read('Would you like to end your turn? (y/n)');
        }
        return input === 'y';
    }
}
