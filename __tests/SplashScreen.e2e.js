describe('SplashScreen', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have next button', async () => {
    await expect(element(by.id('BUTTON_NEXT'))).toBeVisible();
  });

  it('should show new screen after tap', async () => {
    await element(by.id('BUTTON_NEXT')).tap();
    await expect(element(by.id('SPLASH_SCREEN'))).toBeVisible();
  });
});
