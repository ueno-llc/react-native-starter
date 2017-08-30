import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { Provider } from 'mobx-react/native';
import { create, persist } from 'mobx-persist';
import UI from './UI';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

/* eslint-disable */
if (__DEV__) {
  XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;
}
/* eslint-enable */

export default class Store {

  @persist('object', UI)
  ui = new UI();

  async setup() {
    await hydrate('store', this);
    return true;
  }
}

export class StoreProvider extends PureComponent {

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
