# Testing

## Integration, Unit and Code Quality Testing

Code is linted with eslint using @ueno/eslint config with some modifications.

```bash
yarn lint
```

Jest is also used for unit tests with snapshots and enzyme for more granular tests.

```bash
yarn test
```

## E2E Testing

This project uses detox to run end-to-end UI testing with jest as test runner under the hood. Some tooling is needed to get started, but the tests will also run on a CI.

```
brew tap wix/brew
brew install --HEAD applesimutils
npm install -g detox-cli
```

You can build the UI test app for the first time (you need to build again if any code has changed or test debug release).

```bash
yarn build:e2e:ios
yarn build:e2e:android
```

Run UI tests.

```bash
yarn test:e2e:ios
yarn test:e2e:android
```
