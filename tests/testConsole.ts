export async function testConsole(
    userInput: string[],
    readPrompt: string,
    consoleOutput: string,
    assertions: () => Promise<void>,
    mockRead: jest.Mock<Promise<string>, [string?]>,
    mockLog: jest.Mock<undefined, [string]>,
) {
    mockLog.mockReset();
    mockRead.mockReset();
    mockRead.mockImplementation(async (_) => userInput.shift()!);

    await assertions();

    expect(`${mockLog.mock.calls.map((e) => `\n${e[0]}`).join('')}`).toStrictEqual(consoleOutput);
    expect(`${mockRead.mock.calls.map((e) => `\n${e[0]}`).join('')}`).toStrictEqual(readPrompt);
}
