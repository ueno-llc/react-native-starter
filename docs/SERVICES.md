# Services

We recommend the following services to get good developer experience for your app. Follow these guides:

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

Find your `DSN` by going to Project Settings and select **Client keys (DSN)** from the side menu.

The `ORG` and `PROJECT` can be extracted from the `url` on the same page: `sentry.io/settings/**ORG**/**PROJECT**/keys`

```
SENTRY_AUTH_TOKEN=
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
```

_____________

## Firebase

This is completly optional and if you decide to skip Firebase, you can remove all references in Podspec and android gradle to reduce the build weight.

But we recommand this for great integration between analytics, user targeting and push notifications. They also have remote config which is great for A/B testing.

### 1. Create firebase application

[Click here to go to firebase.com](https://firebase.google.com/)

### 2. Create iOS App

Go to Project Settings and create new iOS app.

Download the **GoogleService-Info.plist** file and save as `./ios/<appName>/GoogleService-Info.plist`.

If using App Center, base64 encode this file and add it as an env var `$GOOGLE_SERVICES_PLIST`.

To encode your file you can do: `echo ./ios/<appName>/GoogleService-Info.plist | base64`

### 3. Create Android App

Go to Project Settings and create new Android app.

Download the **google-services.json** file and save as `./android/app/google-services.json`.

If using App Center, base64 encode this file and add it as an env var `$GOOGLE_SERVICES_JSON`.

To encode your file you can do: `echo ./android/app/google-services.json | base64`
