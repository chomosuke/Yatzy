/* eslint-disable no-await-in-loop */
import { Category, getAllCategories } from './Category';
import { Decision, Decisions } from './Decisions';
import { range } from './helpers/range';
import { Player } from './players/Player';
import { ensureRoll, Roll } from './Roll';
import { rollDice } from './rollDice';
import { score } from './score';

export async function play(players: Player[]): Promise<void> {
    if (players.length === 0) {
        return;
    }

    const categoriess = [];
    for (const _ of range(players.length)) {
        categoriess.push(getAllCategories());
    }
    const scores = Array<number>(players.length).fill(0);

    // loop until no more categories are left
    while (categoriess.some((categories) => categories.length !== 0)) {
        for (const i of players.keys()) { // first and second player
            let roll: Roll = [rollDice(), rollDice(), rollDice(), rollDice(), rollDice()];
            players[i].printRoll(roll);
            for (const _t of range(2)) { // first two turn
                if (await players[i].endTurn(roll)) {
                    break;
                }
                const decisions = await players[i].getDecisions(roll);
                roll = reRoll(roll, decisions);
                players[i].printRoll(roll);
            }
            // choose category
            const category: Category = await players[i].getCategory(roll, categoriess[i]);
            // filter category
            categoriess[i] = categoriess[i].filter((c) => c !== category);
            // score and print
            const scoreGained = score(roll, category);
            players[i].printScoreGained(scoreGained);
            scores[i] += scoreGained;
            players[i].printScore(scores[i]);
        }
    }
    const maxScore = Math.max(...scores);
    const winnerIndexs = [];
    for (const i of players.keys()) {
        if (scores[i] === maxScore) {
            winnerIndexs.push(i);
        }
    }
    if (winnerIndexs.length > 1) {
        console.log(`Drawn between ${winnerIndexs.map((i) => players[i].getName()).join(', ')}`);
    } else if (winnerIndexs.length === 1) {
        console.log(`${players[winnerIndexs[0]].getName()} wins with a score of ${scores[winnerIndexs[0]]}!`);
    }
}

function reRoll(rollP: Roll, decisions: Decisions): Roll {
    const roll = [...rollP];
    // execute the decision
    for (const i of roll.keys()) {
        if (decisions[i] === Decision.ReRoll) {
            roll[i] = rollDice();
        }
    }
    return ensureRoll(roll);
}
