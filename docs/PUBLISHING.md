# Publishing

Publishing is probably the most complicated thing about app development. We have made sure to have everything ready and approvable by the app stores.

Make sure you have fastlane before proceeding.

```bash
brew cask install fastlane
```

Also make sure you've [set up all services](/SERVICES.md) you intend to use.

## iOS

### 1. Apple Developer Program

You will need an apple developer account to be able to publish (and test apps).

You can [register for one here](https://developer.apple.com/programs/enroll/), the fee is $99 per year.

### 2. Setup fastlane match

You will need a repository to store all your certificates, make sure to keep this repository private.

Change your `./ios/fastlane/Matchfile` to match your git repository so it looks like this:

```ruby
git_url "git@github.com:repo.git" # Change this URL
app_identifier "com.ueno.reactnativestarter"
type "appstore"
```

Now you can run this command in the `./ios` folder.

```bash
fastlane match appstore
```

It should create the app in Apple Developer Portal for you and so on...

[More details here](https://docs.fastlane.tools/actions/match/#usage)

### 3. Create app in iTunes Connect

Go to iTunes Connect portal and select **My Apps** and create new app.

Select the correct Bundle ID for your app, you can put the same bundle identifier to the SKU field.

Update `./ios/fastlane/Appfile` with your **team_id** and **apple_id**.

(Also update `./ios/fastlane/Deliverfile` with the correct **apple_id**)

## Android

### 1. Google Play Developer Account

You will need a Google Play Developer account to publish and distribute Android apps.

You can [register for one here](https://play.google.com/apps/publish/) and then you'll have to pay one-time fee of $25

Complete your profile and create the app in the Google Play Developer console.

### 2. Download the Google Credentials file

[Guide to download](https://docs.fastlane.tools/getting-started/android/setup/#collect-your-google-credentials)

Save the file as `./android/playstore.json`

### 3. Create app

Create new application in Google Developer Console.

You will need to upload a build manually for the first time before CI can take over uploading automatically.

```bash
# Test that all works well
fastlane supply run
```
