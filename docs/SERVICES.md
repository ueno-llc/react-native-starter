# Services

We recommend the following services to get good developer experience for your app.

## Code Push

Install the code-push command line utility

```bash
npm install -g code-push-cli
```

### 1. Create code-push account

```bash
code-push register
```

### 2. Create code-push app for each platorm

```bash
code-push app add <appName>-android android react-native
code-push app add <appName>-ios ios react-native
```

Write down the deployment keys for future use (you can also retrieve them later).

### 3. Update environment variables in `.env`

```bash
ANDROID_CODEPUSH_APPID=<appName>-android
ANDROID_CODEPUSH_DEPLOYMENT_KEY=<android production deployment key>

IOS_CODEPUSH_APPID=<appName>-ios
IOS_CODEPUSH_DEPLOYMENT_KEY=<android production deployment key>
```

## Sentry

Install the sentry command line utility

```bash
curl -sL https://sentry.io/get-cli/ | bash
```

### 1. Register for Sentry account

https://sentry.io/signup/

Now you can create a organization and your app.

### 2. Create auth token

Go to https://sentry.io/api/ and create new authorization token.

### 3. Store environment varibles to `.env`

Find your DSN by going to Project Settings and select **Client keys** from the side menu.

The ORG and PROJECT can be extracted from the URL on the same page:

sentry.io/<b>&lt;SENTRY_ORG&gt;</b>/<b>&lt;SENTRY_PROJECT&gt;</b>/settings/settings/


```
SENTRY_AUTH_TOKEN=<your generated auth token>
SENTRY_DSN=<dsn url>
SENTRY_ORG=<your organization slug>
SENTRY_PROJECT=<your project slug>
```

## Firebase

This is completly optional and if you decide to skip Firebase, you can remove all references in Podspec and android gradle to reduce the build weight.

But we recommand this for great integration between analytics, user targeting and push notifications. They also have remote config which is great for A/B testing.

### 1. Create firebase application

[Click here to go to firebase.com](https://firebase.google.com/)

### 2. Create iOS App

Go to Project Settings and create new iOS app. 

Download the **GoogleService-Info.plist** file and save as `./ios/<appName>/GoogleService-Info.plist`.

### 3. Create Android App

Go to Project Settings and create new Android app. 

Download the **google-services.json** file and save as `./android/app/google-services.json`.
