describe('CounterScreen', () => {
  beforeAll(async () => {
    await device.relaunchApp();
  });

  it('should show counter screen', async () => {
    await expect(element(by.id('HOME_SCREEN'))).toBeVisible();
    await element(by.label('Counter Screen')).tap();
    await expect(element(by.id('COUNTER_SCREEN'))).toBeVisible();
  });

  it('should increment counter', async () => {
    await expect(element(by.label('Counter: 0'))).toBeVisible();
    await element(by.label('Increment')).tap();
    await expect(element(by.label('Counter: 1'))).toBeVisible();
    await element(by.label('Decrement')).tap();
    await element(by.label('Decrement')).tap();
    await expect(element(by.label('Counter: -1'))).toBeVisible();
  });
});
