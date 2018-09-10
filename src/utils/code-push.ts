import { Platform } from 'react-native';
import { Store } from '../store';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import { config } from '~config';

export function codePushConfig(): CodePushOptions {
  const result: CodePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  };

  if (Platform.OS === 'ios' && Store.UI.isBeta) {
    result.deploymentKey = config.IOS_CODEPUSH_DEPLOYMENT_KEY_STAGING;
    result.installMode = CodePush.InstallMode.IMMEDIATE;
  }

  if (Platform.OS === 'android' && Store.UI.isBeta) {
    result.deploymentKey = config.ANDROID_CODEPUSH_DEPLOYMENT_KEY_STAGING;
    result.installMode = CodePush.InstallMode.IMMEDIATE;
  }

  if (Store.UI.isBeta) {
    result.updateDialog = CodePush.DEFAULT_UPDATE_DIALOG;
  }

  return result;
}
