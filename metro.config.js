const { mergeConfig } = require('metro-config');
const { DEFAULT } = require('react-native/local-cli/util/Config');

const config = {
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx', 'css'],
  },
  transformer: {
    babelTransformerPath: require.resolve('./scripts/transformer.js'),
  },
};

module.exports = mergeConfig(DEFAULT, config);
