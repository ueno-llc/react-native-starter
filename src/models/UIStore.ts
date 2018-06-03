import { types, destroy } from 'mobx-state-tree';
import CodePush, { LocalPackage } from 'react-native-code-push';

const updateMetadataModel = types.model('UpdateMetadata', {
  appVersion: types.string,
  deploymentKey: types.string,
  description: types.string,
  failedInstall: types.boolean,
  isFirstRun: types.boolean,
  isMandatory: types.boolean,
  isPending: types.boolean,
  label: types.string,
  packageHash: types.string,
  packageSize: types.number,
});

const UIStore = types
  .model('UI', {
    updateMetadata: types.optional(updateMetadataModel, {}),
  })
  .views(self => ({
    get version() {
      const { appVersion, label } = self.updateMetadata;

      if (!appVersion) {
        return 'Unknown';
      }

      return `${appVersion || '0.0'}-${label || 'v?'}`;
    },
  }))
  .actions(self => ({
    async update() {
      self.updateMetadata = await CodePush.getUpdateMetadata();
    },
  }))
  .create();

export default UIStore;
