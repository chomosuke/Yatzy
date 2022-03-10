export function assertUnreachable(v: never): never {
    throw Error(`An unreachable line has been reached with value ${v}`);
}
