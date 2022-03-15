import Prando from 'prando';
import { Category } from '../src/Category';
import { Decision, Decisions, ensureDecisions } from '../src/Decisions';
import { Player } from '../src/players/Player';
import { DiceResult, ensureDiceResult, Roll } from '../src/Roll';
import { play } from '../src/play';
import { rollDice } from '../src/rollDice';

global.console.log = jest.fn<undefined, [string]>();

// eslint-disable-next-line no-restricted-syntax
const mockLog = global.console.log as jest.Mock<undefined, [string]>;

jest.mock('../src/rollDice');

// eslint-disable-next-line no-restricted-syntax
const mockRollDice = rollDice as jest.Mock<DiceResult, []>;

class MockPlayer extends Player {
    private readonly name: string;

    getName(): string {
        return this.name;
    }

    private readonly prando: Prando;

    constructor(name: string, seed: number) {
        super();
        this.name = name;
        this.prando = new Prando(seed);
    }

    async getDecisions(_roll: Roll): Promise<Decisions> {
        const result: Decisions = ensureDecisions([
            this.prando.nextInt(0, 1),
            this.prando.nextInt(0, 1),
            this.prando.nextInt(0, 1),
            this.prando.nextInt(0, 1),
            this.prando.nextInt(0, 1),
        ]);
        console.log(`Decisions: ${result.map((decision) => (decision === Decision.Hold ? 'h' : 'r'))}`);
        return result;
    }

    async getCategory(_roll: Roll, categories: Category[]): Promise<Category> {
        console.log('Categories left:');
        for (const category of categories) {
            console.log(category);
        }
        const result = categories[this.prando.nextInt(0, categories.length - 1)];
        console.log(`Category: ${result}`);
        return result;
    }

    async endTurn(_roll: Roll): Promise<boolean> {
        const result = this.prando.nextBoolean();
        console.log(`End: ${result}`);
        return result;
    }

    // eslint-disable-next-line class-methods-use-this
    override printScore(score: number): void {
        console.log(`${this.name}'s score: ${score}`);
    }

    // eslint-disable-next-line class-methods-use-this
    override printScoreGained(score: number): void {
        console.log(`${this.name} has scored ${score} more points`);
    }

    override printRoll(roll: Roll): void {
        console.log(`${this.name} has rolled: ${roll}`);
    }

    override printWinningMessage(score: number): void {
        console.log(`${this.name} wins with a score of ${score}.`);
    }
}

describe('dummy computer player playing against each other', () => {
    it.each([
        [1, false],
        [2, false],
        [3, false],
        [4, false],
        [5, false],
        [6, true], // test drawing
    ])('Sample game %d', async (seed, drawing) => {
        mockRollDice.mockReset();
        mockLog.mockReset();

        const prando = new Prando(seed);

        mockRollDice.mockImplementation(() => ensureDiceResult(drawing ? 1 : prando.nextInt(1, 6)));

        await play([
            new MockPlayer(
                'Player1',
                seed,
            ),
            new MockPlayer(
                'Player2',
                // same seed causes both player to play indentically
                seed + (drawing ? 0 : 100),
            ),
        ]);

        expect(`${mockLog.mock.calls.map((e) => `${e[0]}`).join('\n')}`).toMatchSnapshot();
    });
});
