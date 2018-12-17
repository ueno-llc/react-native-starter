# Environment Variables

Keep all your environment variables in `.env` file in the root of your project. If you don't have any, it will be created by copying the `.env.public`.

## Usage

JavaScript
```js
import config from 'config';

config.MY_ENV_VAR
```

Android
```java
public HttpURLConnection getApiClient() {
    URL url = new URL(BuildConfig.MY_ENV_VAR);
}
```

Gradle
```groovy
defaultConfig {
    applicationId project.env.get("MY_ENV_VAR")
}
```

ObjectiveC/Swift

```objective-c
#import "ReactNativeConfig.h"

NSString *apiUrl = [ReactNativeConfig envFor:@"MY_ENV_VAR"];
```

More examples on [react-native-config documentation](https://github.com/luggit/react-native-config).

## Hot reloading config

You can hot-reload config object by running the following command.

```bash
yarn build:env
```

**Note:** Native modules using environment variables will require fresh build.

## Sensitive values

Do not store sensitive values in your .env configuration. Things like passphrases, secret tokens or other things that you don't want to expose.

To ensure safety you can keep a list of **safe** environment variables in `.env.public`, they will be used to populate the build on CI servers.
