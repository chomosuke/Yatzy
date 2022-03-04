export type Roll = [DiceResult, DiceResult, DiceResult, DiceResult, DiceResult];

export type DiceResult = 1 | 2 | 3 | 4 | 5 | 6;

export function ensureRoll(roll: number[]): Roll {
    if (roll.length === 5
        && roll.every((diceResult) => diceResult >= 1 && diceResult <= 6)
    ) {
        return roll as Roll;
    }
    throw Error(`assertion failed, ${roll} is not a Roll`);
}
