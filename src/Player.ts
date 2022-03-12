import { Decisions } from './Decisions';
import { Roll } from './Roll';

export abstract class Player {
    abstract getDecisions(roll: Roll): Decisions;
}
