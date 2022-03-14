# Yatzy
## setup dev environment
- Install node, npm and yarn.
- If you're using vscode
    - Copy `.vscode base` directory and rename it to `.vscode`.
    - Install extension: `vscode-zipfs` (already recommended in [.vscode base/extensions.json](.vscode%20base/extensions.json)).
    - These let vscode work with yarn properly.

## tips
- If you dislike format on save, you can disable it in `.vscode/settings.json`.
- For TDD, you might want to run you test as frequently as possible, you can use the command `yarn test --watch` to do that.

## how to run
- `yarn serve` to run the program immediately.
- `yarn build` to build the program into javascript.
- `yarn start` to run the build result.

## Quirks and features of this project
- Its template came from https://github.com/chomosuke/typescript-template
- Its eslint config extends from https://github.com/chomosuke/eslint-config
- It uses yarn zero install, this means:
    - The dependency is committed to the repository under [.yarn/cache](.yarn/cache).
    - You don't have to run yarn install when you clone the repository.
    - You know for a fact that yarn is deterministic, or in another word, you don't even care if yarn is deterministic, because git make sure all your developers' dependencies are the same.
    - Sometimes if your dependencies gets too large, you might need git lfs to manage it.
    - You can opt out of zero install by gitignoring different files, more detail at [.gitignore](.gitignore).
- eslint plugin for vscode (recommended in [.vscode base/extensions.json](.vscode%20base/extensions.json)) help you catch your linting error at the earliest second.
- vscode-zipfs (recommended in [.vscode base/extensions.json](.vscode%20base/extensions.json)) let vscode work with yarn's zip files.
