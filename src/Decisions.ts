export enum Decision {
    Hold,
    ReRoll,
}

export type Decisions = [Decision, Decision, Decision, Decision, Decision];

export function isDecisions(decisions: Decision[]): decisions is Decisions {
    return decisions.length === 5;
}

export function ensureDecisions(decisions: Decision[]): Decisions {
    if (isDecisions(decisions)) {
        return decisions;
    }
    throw Error(`assertion failed, ${decisions} is not a Decisions.`);
}
