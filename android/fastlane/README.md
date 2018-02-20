fastlane documentation
================
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
## Android
### android build
```
fastlane android build
```
Build Release
### android bump_version
```
fastlane android bump_version
```
Bump version number
### android tag_version
```
fastlane android tag_version
```
Tag current version and push to GitHub
### android bitrise
```
fastlane android bitrise
```
Bitrise build to Google Play
### android travis
```
fastlane android travis
```
Travis build to Google Play

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
