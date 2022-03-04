export function count<T>(arr: T[], e: T): number {
    return arr.reduce((c, v) => (v === e ? c + 1 : c), 0);
}
