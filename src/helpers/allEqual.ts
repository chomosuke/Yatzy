export function allEqual(arr: unknown[]): boolean {
    if (arr.length === 0) {
        return true;
    }
    return arr.every((e) => e === arr[0]);
}
