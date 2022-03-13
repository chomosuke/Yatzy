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

    expect(`\n${mockLog.mock.calls.map((e) => e[0]).join('\n')}`).toStrictEqual(consoleOutput);
    expect(`\n${mockRead.mock.calls.map((e) => e[0]).join('\n')}`).toStrictEqual(readPrompt);
}
