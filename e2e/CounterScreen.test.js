function formatLabel(label) {
  const platform = device.getPlatform();
  if (platform === 'android') {
    return label.toLocaleUpperCase();
  }
  return label;
}

describe('CounterScreen', () => {
  beforeAll(async () => {
    await device.relaunchApp();
  });

  it('should show counter screen', async () => {
    await expect(element(by.id('HOME_SCREEN'))).toBeVisible();
    await element(by.text(formatLabel('Counter Screen'))).tap();
    await expect(element(by.id('COUNTER_SCREEN'))).toBeVisible();
  });

  it('should increment counter', async () => {
    await expect(element(by.text('Counter: 0'))).toBeVisible();
    await element(by.text(formatLabel('Increment'))).tap();
    await expect(element(by.text('Counter: 1'))).toBeVisible();
    await element(by.text(formatLabel('Decrement'))).tap();
    await element(by.text(formatLabel('Decrement'))).tap();
    await expect(element(by.text('Counter: -1'))).toBeVisible();
  });
});
