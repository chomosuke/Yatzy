import { Category } from '../Category';
import { Decisions } from '../Decisions';
import { Roll } from '../Roll';

export abstract class Player {
    abstract getName(): string;
    abstract getDecisions(roll: Roll): Promise<Decisions>;
    abstract getCategory(roll: Roll, categories: Category[]): Promise<Category>;
    abstract endTurn(roll: Roll): Promise<boolean>;

    printRoll(roll: Roll) {
        console.log(`${this.getName()} has rolled ${roll.join(', ')}.`);
    }

    printScore(score: number): void {
        console.log(`${this.getName()}'s score: ${score}`);
    }

    printScoreGained(score: number): void {
        console.log(`${this.getName()} scored ${score} more points.`);
    }

    printWinningMessage(score: number): void {
        console.log(`${this.getName()} wins with a score of ${score}.`);
    }
}
