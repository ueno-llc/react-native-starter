const blacklist = require('metro/src/blacklist')

module.exports = {
  getTransformModulePath() {
    return require.resolve('./scripts/transformer.js');
  },
  getSourceExts() {
    return [
      'js',
      'ts',
      'tsx',
      'css',
      // 'styl',
      // 'scss',
      // 'sass',
      // 'less',
    ];
  },
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  },
};
