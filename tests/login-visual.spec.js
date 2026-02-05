const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Login Page Visual Comparison', () => {
    test('compare html implementation vs figma design', async ({ page }) => {
        // 1. 로컬 HTML 파일 로드
        // 실제 환경에서는 개발 서버 URL을 사용합니다 (예: http://localhost:3000/login)
        const filePath = path.join(__dirname, '../public/login.html');
        await page.goto(`file://${filePath}`);

        // 2. 시각적 비교 수행
        // 'login-design.png'는 Figma에서 내보낸 이미지라고 가정합니다.
        // 첫 실행 시 스냅샷이 생성되며, 이를 '기준 이미지'로 사용하게 됩니다.
        await expect(page).toHaveScreenshot('login-design.png', {
            fullPage: true,
            
            // --- 이미지 비교 옵션 예시 ---
            
            // 1. maxDiffPixelRatio: 허용할 차이의 '비율' (0.05 = 5%)
            // 예: 전체 화면의 5%까지 달라도 테스트를 통과시킵니다.
            maxDiffPixelRatio: 0.05, 

            // 2. maxDiffPixels: 허용할 차이의 '픽셀 개수'
            // maxDiffPixels: 100, // 100 픽셀까지는 달라도 통과

            // 3. threshold: 개별 픽셀 색상 비교 민감도 (0 ~ 1, 기본값 0.2)
            // 값이 클수록 색상 차이를 더 많이 무시합니다.
            // threshold: 0.3,
        });
    });
});
