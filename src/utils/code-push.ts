import { Platform } from 'react-native';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import { config } from './config';

export function codePushConfig(): CodePushOptions {
  const result: CodePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  };

  if (Platform.OS === 'ios' && config.isBeta) {
    result.deploymentKey = config.IOS_CODEPUSH_DEPLOYMENT_KEY_STAGING;
    result.installMode = CodePush.InstallMode.IMMEDIATE;
    result.updateDialog = true as any;
  }

  if (Platform.OS === 'android' && config.isBeta) {
    result.deploymentKey = config.ANDROID_CODEPUSH_DEPLOYMENT_KEY_STAGING;
    result.installMode = CodePush.InstallMode.IMMEDIATE;
    result.updateDialog = true as any;
  }

  return result;
}
