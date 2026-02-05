# Playwright Visual Testing Demo Project

이 프로젝트는 JavaScript 기반의 Playwright를 사용하여 Visual Testing(시각적 회귀 테스트)을 수행하는 방법을 보여주는 데모입니다.

## 📋 사전 요구사항 (Prerequisites)

- [Node.js](https://nodejs.org/) (v14 이상 권장)
- npm (Node.js 설치 시 포함됨)

## 🚀 설치 방법 (Installation)

1. **프로젝트 클론 또는 다운로드**

2. **의존성 설치**
   프로젝트 루트 경로에서 다음 명령어를 실행하여 필요한 패키지를 설치합니다.

   ```bash
   npm install
   ```

3. **Playwright 브라우저 설치**
   테스트에 필요한 브라우저 바이너리를 설치합니다.
   ```bash
   npx playwright install
   ```

## 🧪 테스트 실행 방법 (How to Test)

### 1. 기본 테스트 실행

모든 테스트를 실행하고 시각적 비교를 수행합니다.

```bash
npx playwright test
```

- **최초 실행 시:** 기준 스냅샷(Baseline Snapshot)이 없으므로 테스트가 실패하거나 경고가 뜨며, 자동으로 스냅샷이 생성될 수 있습니다 (설정에 따라 다름). 보통은 "Error: A snapshot doesn't exist..." 에러가 발생합니다. 이 경우 아래의 **스냅샷 업데이트** 명령어를 실행해 주세요.

### 2. 스냅샷 업데이트 (Update Snapshots)

기준 스냅샷을 새로 생성하거나 업데이트하려면 다음 명령어를 사용합니다.
UI가 의도적으로 변경되었거나 최초 실행 시 사용합니다.

```bash
npx playwright test --update-snapshots
```

### 3. UI 모드로 실행

인터랙티브한 UI 환경에서 테스트를 실행하고 디버깅할 수 있습니다.

```bash
npx playwright test --ui
```

### 4. 결과 리포트 보기

테스트 실행 후 HTML 리포트를 확인합니다.

```bash
npx playwright show-report
```

## 🎨 Figma Design vs HTML 비교 방법

Figma에서 디자인한 산출물(이미지)과 실제 개발된 화면이 얼마나 일치하는지 비교하는 방법입니다.

1. **Figma 이미지 준비**: 비교할 화면(예: 로그인)을 Figma에서 PNG로 내보내기 합니다.
2. **테스트 최초 실행**: 기준 스냅샷(Baseline)을 생성하기 위해 테스트를 한 번 실행합니다.
   ```bash
   npx playwright test tests/login-visual.spec.js
   ```
   > ⚠️ 처음에는 스냅샷이 없어서 에러가 발생합니다. (`A snapshot doesn't exist...`)
3. **스냅샷 파일 교체**:
   - 생성된 스냅샷 폴더(`tests/login-visual.spec.js-snapshots/`)로 이동합니다.
   - 방금 생성된 `login-design-chromium-darwin.png` (파일명은 OS/브라우저에 따라 다름) 파일을 삭제합니다.
   - **준비한 Figma 이미지**를 같은 이름으로 변경하여 해당 위치에 넣어줍니다.
4. **검증 테스트 실행**: 이제 Figma 이미지가 기준이 됩니다. HTML 화면과 비교해 봅니다.

   ```bash
   npx playwright test tests/login-visual.spec.js
   ```

   - 만약 다르면 실패하고, Diff 이미지를 통해 픽셀 단위 차이점을 확인할 수 있습니다.

## 🖼️ 이미지 비교 옵션 (Mismatch Handling)

테스트가 너무 엄격하거나 느슨하다고 느껴질 때, 다음 옵션들을 사용하여 민감도를 조절할 수 있습니다.

### 1. 허용 오차 (Sensitivity)

- **`threshold`**: (기본값: 0.2)
  - 개별 픽셀의 색상 차이를 얼마나 허용할지 결정합니다. (0 ~ 1)
  - `0`: 100% 완벽하게 일치해야 함 (가장 엄격)
  - `1`: 완전히 다른 색상이어도 통과 (가장 느슨)
  - 예: 안티앨리어싱(Anti-aliasing) 등으로 인한 미세한 차이를 무시하려면 `0.3` 정도로 높여볼 수 있습니다.

### 2. 허용 범위 (Thresholds)

테스트 통과 기준을 "몇 개의 픽셀" 또는 "전체의 몇 %"까지 허용할지 설정합니다.

- **`maxDiffPixels`**:
  - 허용할 **최대 픽셀 개수**입니다.
  - 예: `maxDiffPixels: 100` (100개 픽셀 차이까지는 통과)

- **`maxDiffPixelRatio`**:
  - 허용할 **최대 비율**입니다. (0 ~ 1)
  - 예: `maxDiffPixelRatio: 0.05` (전체 이미지의 5% 차이까지는 통과)

### 사용 예시

```javascript
await expect(page).toHaveScreenshot("image.png", {
  threshold: 0.3, // 색상 차이 민감도 조절
  maxDiffPixelRatio: 0.05, // 전체의 5% 차이 허용
  // maxDiffPixels: 100,    // 100 픽셀 차이 허용 (위 옵션과 함께 사용 시 둘 중 하나라도 초과하면 실패)
});
```

## 📂 프로젝트 구조 (Project Structure)

- `public/`: 정적 예제 파일 (예: mock login page)
- `playwright.config.js`: Playwright 설정 파일 (브라우저, 뷰포트 등 설정)
- `tests/`: 테스트 파일이 위치하는 디렉토리
  - `visual.spec.js`: 시각적 테스트 예제가 포함된 파일
- `test-results/`: 테스트 실패 시 차이점(Diff) 이미지가 저장되는 곳

## 📸 Visual Testing 원리

1. **Baseline Image**: 처음 테스트를 성공했을 때 저장되는 기준 이미지입니다. (`tests/__snapshots__` 폴더 등에 저장됨)
2. **Comparison**: 이후 테스트 실행 시, 현재 브라우저 화면을 캡처하여 Baseline Image와 픽셀 단위로 비교합니다.
3. **Diff**: 픽셀 차이가 허용 오차 범위를 넘어서면 테스트가 실패하고, 차이점을 보여주는 Diff 이미지가 생성됩니다.
