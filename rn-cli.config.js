module.exports = {
  getTransformModulePath() {
    return require.resolve('./scripts/transformer.js');

  },
  getSourceExts() {
    return ['ts', 'tsx', 'css'];
  },
};
