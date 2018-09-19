describe('SplashScreen', () => {

  beforeEach(async () => {
    await device.relaunchApp();
  });

  it('should show sample screen', async () => {
    await expect(element(by.id('SAMPLE_SCREEN'))).toBeVisible();
  });

});
