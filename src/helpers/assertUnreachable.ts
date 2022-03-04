export function assertUnreachable(v: never): any {
    throw Error(`An unreachable line has been reached with value ${v}`);
}
