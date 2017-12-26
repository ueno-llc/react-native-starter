/* global driver config wait */
describe('Test SplashScreen', () => {

  beforeAll(async () => {
    await driver.init(config);
    await wait(1000);
  }, 60000);

  afterAll(async () => {
    await driver.quit();
  });

  it('test if jest works', () => {
    expect(1).toBe(1);
  });

  it('has a "Next" button', async () => {
    expect(await driver.hasElementById('BUTTON_NEXT')).toBe(true);
  });

  it('press the button', async () => {
    const button = await driver.elementById('BUTTON_NEXT');
    button.click();
    await wait(1000);
  });

  it('confirm screen appears', async () => {
    expect(await driver.hasElementById('SPLASH_SCREEN')).toBe(true);
  });
});
