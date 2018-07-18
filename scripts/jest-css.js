const css2rn = require('css-to-react-native-transform').default;

function process(src) {
  try {
    const cssObject = css2rn(src, { parseMediaQueries: false });
    return `module.exports = ${JSON.stringify(cssObject)}`;
  } catch (err) {
    return 'module.exports = {}';
  }
}

module.exports = {
  process,
};
