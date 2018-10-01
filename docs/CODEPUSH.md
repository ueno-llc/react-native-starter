# Code Push

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
