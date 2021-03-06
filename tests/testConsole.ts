export async function testReadConsole(
    userInput: string[],
    readPrompt: string,
    consoleOutput: string,
    assertions: () => Promise<void>,
    mockRead: jest.Mock<Promise<string>, [string?]>,
    mockLog: jest.Mock<undefined, [string]>,
) {
    mockRead.mockReset();
    mockRead.mockImplementation(async (_) => {
        const i = userInput.shift();
        if (i === undefined) {
            throw new Error('read() is called more than expected');
        }
        return i;
    });

    await testConsole(
        consoleOutput,
        assertions,
        mockLog,
    );

    expect(`${mockRead.mock.calls.map((e) => `\n${e[0]}`).join('')}`).toStrictEqual(readPrompt);
}
export async function testConsole(
    consoleOutput: string,
    assertions: () => Promise<void>,
    mockLog: jest.Mock<undefined, [string]>,
) {
    mockLog.mockReset();

    await assertions();

    expect(`${mockLog.mock.calls.map((e) => `\n${e[0]}`).join('')}`).toStrictEqual(consoleOutput);
}
