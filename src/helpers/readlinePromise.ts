import readline from 'readline';

export function read(prompt: string = ''): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve, _reject) => {
        rl.question(prompt, (input) => {
            resolve(input);
            rl.close();
        });
    });
}
