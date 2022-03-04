export function sum(nums: number[]): number {
    return nums.reduce((partialSum, a) => partialSum + a, 0);
}
