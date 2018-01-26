import { observable, computed, action } from 'mobx';
import { persist } from 'mobx-persist';
import codePush from 'react-native-code-push';

export default class UI {

  @action
  async setup() {
    // Get CodePush update info
    this.codepushConfig = await codePush.getConfiguration();
    this.codepushUpdate = await codePush.getUpdateMetadata();
    return true;
  }

  @persist('object')
  @observable
  codepushConfig;

  @persist('object')
  @observable
  codepushUpdate;

  @computed
  get version() {
    const {
      appVersion,
      label,
    } = this.codepushUpdate || {};

    if (!appVersion) {
      return 'Unknown';
    }

    return `${appVersion || '0.0'}-${label || 'v?'}`;
  }

}
