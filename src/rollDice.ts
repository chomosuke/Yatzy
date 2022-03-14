import { DiceResult, ensureDiceResult } from './Roll';

export function rollDice(): DiceResult {
    return ensureDiceResult(Math.floor(1 + Math.random() * 6));
}
