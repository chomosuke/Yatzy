import { Category } from '../Category';
import { Decisions } from '../Decisions';
import { Roll } from '../Roll';

export abstract class Player {
    abstract showRoll(roll: Roll): void;
    abstract getDecisions(roll: Roll): Promise<Decisions>;
    abstract getCategory(roll: Roll, categories: Category[]): Promise<Category>;
    abstract endTurn(roll: Roll): Promise<boolean>;
    abstract showScore(score: number): void;
    abstract showScoreGained(score: number): void;
}
