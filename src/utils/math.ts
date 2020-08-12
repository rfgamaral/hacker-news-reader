function clamp(x: number, lower: number, upper: number): number {
    return Math.min(Math.max(x, lower), upper);
}

export { clamp };
