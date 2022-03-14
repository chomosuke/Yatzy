import fill from 'fill-range';

export function range(end: number, start?: number) {
    return fill(start ?? 0, end - 1);
}
