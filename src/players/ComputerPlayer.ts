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
    private static getCategoryPrivate(roll: Roll, categoriesIn: Category[]): Category {
        const categories = [...categoriesIn];
        for (const category of chooseIfScore) {
            if (categories.includes(category)) {
                if (score(roll, category) > 0) {
                    return category;
                }
                // we know this category scored 0
                categories.filter((c) => c !== category);
            }
        }

        if (categories.length === 0) {
            return categoriesIn[0];
        }
        let maxCategory = categories[0];
        let maxScore = score(roll, maxCategory);
        for (const category of categories) {
            const scored = score(roll, category);
            if (scored > maxScore) {
                maxScore = scored;
                maxCategory = category;
            }
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
