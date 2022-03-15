import { Category } from '../Category';
import { Decision, Decisions } from '../Decisions';
import { Roll } from '../Roll';
import { score } from '../score';
import { Player } from './Player';

const chooseIfScore = [
    Category.Yatzy,
    Category.TwoPairs,
    Category.ThreeOfAKind,
    Category.FourOfAKind,
    Category.SmallStraight,
    Category.LargeStraight,
    Category.FullHouse,
];

const rankedCategories = [
    Category.Ones,
    Category.Twos,
    Category.Threes,
    Category.Fours,
    Category.Fives,
    Category.Sixes,
    Category.Pair,
    Category.Chance,
];

export class ComputerPlayer extends Player {
    private readonly name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    // eslint-disable-next-line class-methods-use-this
    async getDecisions(_roll: Roll): Promise<Decisions> {
        return [randDecision(), randDecision(), randDecision(), randDecision(), randDecision()];
    }

    async getCategory(roll: Roll, categories: Category[]): Promise<Category> {
        const category = ComputerPlayer.getCategoryPrivate(roll, categories);
        console.log(`${this.getName()} has choosen category: ${category}`);
        return category;
    }

    // eslint-disable-next-line class-methods-use-this
    private static getCategoryPrivate(roll: Roll, categories: Category[]): Category {
        for (const category of chooseIfScore) {
            if (categories.includes(category)) {
                if (score(roll, category) > 0) {
                    return category;
                }
            }
        }

        let maxCategory: Category | null = null;
        let maxScore = 0;
        for (const category of rankedCategories) {
            if (categories.includes(category)) {
                const scored = score(roll, category);
                if (scored > maxScore) {
                    maxScore = scored;
                    maxCategory = category;
                }
            }
        }

        if (maxCategory === null) {
            return categories[0];
        }
        return maxCategory;
    }

    // eslint-disable-next-line class-methods-use-this
    async endTurn(_roll: Roll): Promise<boolean> {
        return randBool();
    }
}

function randBool() {
    return Math.random() < 0.5;
}

function randDecision() {
    return randBool() ? Decision.Hold : Decision.ReRoll;
}
