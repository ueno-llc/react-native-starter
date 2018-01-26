/* global XMLHttpRequest */
/* eslint no-unused-expressions: 0 no-global-assign: 0 */

const bypass = (cb) => {
  if (!GLOBAL.enabledXMLHttpRequest) {
    return cb();
  }
  toggle();
  const result = cb();
  toggle();
  return result;
};

const toggle = (flag) => {
  if (!__DEV__) {
    // Disabled for production builds
    return;
  }

  if (!GLOBAL.sourceXMLHttpRequest) {
    // Store original XHR
    GLOBAL.sourceXMLHttpRequest = XMLHttpRequest;
  }

  if (!GLOBAL.enabledXMLHttpRequest || flag === true) {
    // Set Browser XHR
    XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
    GLOBAL.enabledXMLHttpRequest = true;
  } else if (GLOBAL.enabledXMLHttpRequest || flag === false) {
    // Set Original XHR
    XMLHttpRequest = GLOBAL.sourceXMLHttpRequest;
    GLOBAL.enabledXMLHttpRequest = false;
  }
};

const enabled = () => toggle(true);
const disabled = () => toggle(false);

global.xhr = {
  toggle,
  bypass,
  enabled,
  disabled,
};

export default global.xhr;
