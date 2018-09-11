import { Platform } from 'react-native';
import CodePush, { CodePushOptions } from 'react-native-code-push';

import { UI } from '~stores/UI';
import { config } from '~config';

export function codePushConfig(): CodePushOptions {
  const result: CodePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  };

  if (Platform.OS === 'ios' && UI.isBeta) {
    result.deploymentKey = config.IOS_CODEPUSH_DEPLOYMENT_KEY_STAGING;
    result.installMode = CodePush.InstallMode.IMMEDIATE;
  }

  if (Platform.OS === 'android' && UI.isBeta) {
    result.deploymentKey = config.ANDROID_CODEPUSH_DEPLOYMENT_KEY_STAGING;
    result.installMode = CodePush.InstallMode.IMMEDIATE;
  }

  if (UI.isBeta) {
    result.updateDialog = CodePush.DEFAULT_UPDATE_DIALOG;
  }

  return result;
}
