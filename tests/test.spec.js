const { test, expect } = require('@playwright/test');

test.describe('Testing Demo', () => {

  test('test', async ({ page }) => {
    // 1. 테스트할 페이지로 이동
    await page.goto('https://headlessui.com/');

    // 2. 페이지가 로드될 때까지 대기 (필요시 특정 요소 대기)
    await expect(page).toHaveTitle(/headlessui/);

    // 3. 전체 페이지 스크린샷 비교
    // 처음 실행 시 스냅샷이 없으면 자동으로 생성됩니다.
    // 이후 실행부터는 저장된 스냅샷과 현재 화면을 비교합니다.
    await expect(page).toHaveScreenshot('headlessui-page.png', {
      fullPage: true, // 전체 페이지 캡처 옵션
    });
  });

  test('specific element test', async ({ page }) => {
    await page.goto('https://headlessui.com/');

    // 특정 요소(예: 헤더)만 선택하여 비교
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header.png');
  });
});
