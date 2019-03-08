describe('HomeScreen', () => {
  beforeEach(async () => {
    await device.relaunchApp();
  });

  it('should show home screen', async () => {
    await expect(element(by.id('HOME_SCREEN'))).toBeVisible();
  });
});
