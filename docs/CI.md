# Continous Delivery

![Imgur](https://i.imgur.com/o91jUrQ.png)

The pipeline to continously deliver the app are two separate processes integrated into one. Each platform is ran individually in a travis matrix (osx, android and node_js).

Commit changes are detected in `./android` and `./ios` folder that will make native builds automatically.

New builds will also be triggered via commit message tags `[BUILD]` for both or explicitly `[BUILD IOS]` and `[BUILD ANDROID]`.

### Android ci
 - run `jest`, `lint` and `detox test` in Android Emulator
 - build a release and upload to Play Store
 - update build number, git commit, tag and push to github

### iOS
 - run `jest`, `lint` and `detox test` in iOS Simulator
 - builds a release and uploads to TestFlight
 - update build number, git commit, tag and push to github

### CodePush
 - run `jest` and `lint`
 - packs and deploys bundle to code-push android staging.
 - packs and deploys bundle to code-push ios staging.
 - upload source maps to sentry

Every task listed above is conditionally executed based on other task actions. It will for example not deploy a code-push update for android if a native android build was done (and same for iOS).
