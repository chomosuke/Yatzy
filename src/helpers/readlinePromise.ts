import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export function read(prompt: string = ''): Promise<string> {
    return new Promise((resolve, reject) => {
        rl.question(prompt, (input) => {
            resolve(input);
        });
    });
}
