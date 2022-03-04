export function countArray<T>(array: T[]): Map<T, number> {
    const counts = new Map<T, number>();
    for (const e of array) {
        counts.set(e, (counts.get(e) || 0) + 1);
    }
    return counts;
}
