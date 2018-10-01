# Firebase

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
