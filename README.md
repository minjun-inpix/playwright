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

## 📂 프로젝트 구조 (Project Structure)

- `playwright.config.js`: Playwright 설정 파일 (브라우저, 뷰포트 등 설정)
- `tests/`: 테스트 파일이 위치하는 디렉토리
  - `visual.spec.js`: 시각적 테스트 예제가 포함된 파일
- `test-results/`: 테스트 실패 시 차이점(Diff) 이미지가 저장되는 곳

## 📸 Visual Testing 원리

1. **Baseline Image**: 처음 테스트를 성공했을 때 저장되는 기준 이미지입니다. (`tests/__snapshots__` 폴더 등에 저장됨)
2. **Comparison**: 이후 테스트 실행 시, 현재 브라우저 화면을 캡처하여 Baseline Image와 픽셀 단위로 비교합니다.
3. **Diff**: 픽셀 차이가 허용 오차 범위를 넘어서면 테스트가 실패하고, 차이점을 보여주는 Diff 이미지가 생성됩니다.

---

이 데모를 통해 Playwright의 강력한 Visual Testing 기능을 체험해 보세요!
