# fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using

```
[sudo] gem install fastlane -NV
```

or alternatively using `brew cask install fastlane`

# Available Actions

## iOS

### ios build

```
fastlane ios build
```

Build

### ios build_release

```
fastlane ios build_release
```

Build Release

### ios bump_version

```
fastlane ios bump_version
```

Bump version number

### ios tag_version

```
fastlane ios tag_version
```

Tag current version and push to GitHub

### ios bitrise

```
fastlane ios bitrise
```

Bitrise build to TestFlight

### ios travis

```
fastlane ios travis
```

Travis build to TestFlight

---

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
