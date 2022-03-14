export type Roll = [DiceResult, DiceResult, DiceResult, DiceResult, DiceResult];

export type DiceResult = 1 | 2 | 3 | 4 | 5 | 6;

export function ensureRoll(roll: number[]): Roll {
    if (isRoll(roll)) {
        return roll;
    }
    throw new Error(`assertion failed, ${roll} is not a Roll`);
}

export function isRoll(roll: number[]): roll is Roll {
    return roll.length === 5 && roll.every((diceResult) => isDiceResult(diceResult));
}

export function ensureDiceResult(diceResult: number): DiceResult {
    if (isDiceResult(diceResult)) {
        return diceResult;
    }
    throw new Error(`assertion failed, ${diceResult} is not a DiceResult`);
}

export function isDiceResult(diceResult: number): diceResult is DiceResult {
    return diceResult >= 1 && diceResult <= 6;
}
