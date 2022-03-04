export type Roll = [number, number, number, number, number];

export function ensureRoll(roll: number[]): Roll {
    if (roll.length === 5) {
        return roll as Roll;
    }
    throw Error(`assertion failed, ${roll} is not a Roll`);
}
