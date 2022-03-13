import { Decisions } from '../Decisions';
import { Player } from './Player';
import { Roll } from '../Roll';

export class HumanPlayer extends Player {
    private name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    // eslint-disable-next-line class-methods-use-this
    async getDecisions(_roll: Roll): Promise<Decisions> {
        throw new Error();
    }
}
