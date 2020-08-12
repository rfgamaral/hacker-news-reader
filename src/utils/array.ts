function pickRandomElementFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

export { pickRandomElementFromArray };
