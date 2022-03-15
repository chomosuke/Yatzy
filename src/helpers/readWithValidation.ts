import { read } from './readlinePromise';

export async function readWithValidation(
    prompt: string,
    errorPrompt: string,
    validation: (input: string) => boolean,
): Promise<string> {
    while (true) {
        // eslint-disable-next-line no-await-in-loop
        const input = await read(prompt);
        if (validation(input)) {
            return input;
        }
        console.log(errorPrompt);
    }
}
