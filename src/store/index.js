import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, AsyncStorage } from 'react-native';
import { Provider } from 'mobx-react/native';
import { Sentry } from 'react-native-sentry';
import { create, persist } from 'mobx-persist';
import codePush from 'react-native-code-push';
import isEmpty from 'lodash/isEmpty';
import config from 'config';
import UI from './UI';
import xhr from '../utils/xhr';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export default class Store {

  @persist('object', UI)
  ui = new UI();

  async setup() {
    // Hydrate store
    await hydrate('store', this);
    // Setup sub-stores.
    await this.ui.setup();
    return this;
  }
}

class StoreProvider extends PureComponent {

  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    store: {},
    children: undefined,
  };

  render() {
    const { store, children } = this.props;

    return (
      <Provider ui={store.ui}>
        {children}
      </Provider>
    );
  }
}

/**
 * Get Provider method
 * Setup all services for dev or production.
 * @returns {Component}
 */
export const getProvider = async () => {

  if (__DEV__) {
    console.log('Provider initialized in developer mode'); // eslint-disable-line no-console
    xhr.enabled();
    // No setup needed for developer environment
    return StoreProvider;
  }

  if (!__DEV__ && !isEmpty(config.SENTRY_DSN)) {
    // Initialize Sentry
    if (config.SENTRY_DSN && config.SENTRY_DSN !== '') {
      Sentry.config(config.SENTRY_DSN).install();
    }

    // Set Sentry CodePush metadata
    codePush.getUpdateMetadata()
      .then((update) => {
        if (update) {
          Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`);
        }
      });
  }

  // Setup codepush config
  const codePushConfig = {};

  if (Platform.OS === 'ios' && config.isTestFlight) {
    // We detected TestFlight installation
    // So we can use Staging deployment from Code Push
    codePushConfig.deploymentKey = config.IOS_CODEPUSH_DEPLOYMENT_KEY_STAGING;
    codePushConfig.updateDialog = true;
  }

  return codePush(codePushConfig)(StoreProvider);
};
