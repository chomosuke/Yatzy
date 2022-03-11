export type Roll = [DiceResult, DiceResult, DiceResult, DiceResult, DiceResult];

export type DiceResult = 1 | 2 | 3 | 4 | 5 | 6;

export function ensureRoll(roll: number[]): Roll {
    if (isRoll(roll)) {
        return roll;
    }
    throw Error(`assertion failed, ${roll} is not a Roll`);
}

export function isRoll(roll: number[]): roll is Roll {
    return roll.length === 5 && roll.every((diceResult) => diceResult >= 1 && diceResult <= 6);
}
