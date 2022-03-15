/* eslint-disable no-await-in-loop */
import ordinal from 'ordinal';
import { Category } from '../Category';
import { Decision, Decisions, ensureDecisions } from '../Decisions';
import { Player } from './Player';
import { Roll } from '../Roll';
import { read } from '../helpers/readlinePromise';
import { readWithValidation } from '../helpers/readWithValidation';

export class HumanPlayer extends Player {
    private name: string;

    getName() {
        return this.name;
    }

    constructor(name: string) {
        super();
        this.name = name;
    }

    // eslint-disable-next-line class-methods-use-this
    async getDecisions(roll: Roll): Promise<Decisions> {
        const decisions: Decision[] = [];
        for (let i = 0; i < roll.length; i++) {
            const input = await readWithValidation(
                `Hold or re-roll for the ${ordinal(i + 1)} dice (current: ${roll[i]})? (h/r)`,
                'Please type h for hold and r for re-roll.',
                (v) => ['r', 'h'].includes(v),
            );
            decisions.push(input === 'r' ? Decision.ReRoll : Decision.Hold);
        }
        return ensureDecisions(decisions);
    }

    // eslint-disable-next-line class-methods-use-this
    async getCategory(_roll: Roll, categories: Category[]): Promise<Category> {
        let input = await read('Place roll in category: ');
        while (true) {
            while (input === 'h') {
                for (const category of categories) {
                    console.log(category);
                }
                input = await read('Place roll in category: ');
            }
            for (const category of categories) {
                if (input === category) {
                    return category;
                }
            }
            input = await read('Category not recognized, please try again (press h to list all available categories): ');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async endTurn(_roll: Roll): Promise<boolean> {
        const input = await readWithValidation(
            'Would you like to end your turn? (y/n)',
            'Unrecognized input, please type "y" or "n".',
            (v) => ['y', 'n'].includes(v),
        );
        return input === 'y';
    }
}
