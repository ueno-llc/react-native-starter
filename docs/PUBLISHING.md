# Publishing

## Setup Sentry and update environment keys

Create project in Sentry and update your .env (just one project needed for both platforms).
```
SENTRY_DSN=https://a:b@sentry.io/12345
SENTRY_PROJECT=app-name
SENTRY_ORG=company-name
```

Then get authorization token from here (https://docs.sentry.io/api/auth/)

```
SENTRY_AUTH_TOKEN=abcdef0123456789
```

## Create app in iTunes Connect

Create app in itunes connect
Update your `ios/fastlane/[Appfile,Matchfile]`
Run `fastlane match appstore`

Note: You need to have a repository containing all your certificates managed by fastlane match that travis can access.

## Create app in Play Store

Create app in play store.
Get your `playstore.json` file and put into android folder (https://docs.fastlane.tools/actions/supply/#setup).
Update your `android/fastlane/[Appfile,Matchfile]`.
Run `fastlane supply run`

Note: You need to upload at least one APK to the playstore manually before Continous Deployment can take over.


## Setup travis

Sign into travis with your GitHub account, find your repository in the list and mark the checkbox.

Note: It is extremely important to use secret environment variables if the target repository is public (travis.org).

Add all your environment variables (public/secrets)
```
travis env set ANDROID_BUNDLE_ID=com.companyname.appnameandroid
travis encrypt MATCH_PASSWORD=yourpassword --add
```

Run this script to add secret files to your repository that travis can read. When promted for password, use your password set for `MATCH_PASSWORD`.
```
./.travis/gen-secrets.sh
```

Commit and push should start travis.
