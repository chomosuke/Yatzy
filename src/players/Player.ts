import { Category } from '../Category';
import { Decisions } from '../Decisions';
import { Roll } from '../Roll';

export abstract class Player {
    abstract getDecisions(roll: Roll): Promise<Decisions>;
    abstract getCategory(roll: Roll): Promise<Category>;
    abstract endTurn(roll: Roll): Promise<boolean>;
}
