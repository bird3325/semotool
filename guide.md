# 세모툴 운영 가이드: Google AdSense & 앱 아이콘

이 가이드는 Google AdSense 광고 연동을 마무리하고, 앱 아이콘을 변경하는 방법에 대해 설명합니다.

## 1. Google AdSense 연동 마무리

소스 코드에는 Google AdSense 연동을 위한 기본적인 코드가 포함되어 있지만, 실제 광고를 송출하기 위해서는 본인의 AdSense 정보를 입력해야 합니다.

### 1-1. AdSense 정보 준비
Google AdSense 웹사이트에서 다음 두 가지 정보를 확인하세요.
*   **Publisher ID (웹 게시자 ID)**: `ca-pub-`으로 시작하는 ID입니다.
*   **Slot ID (광고 단위 ID)**: 숫자로 된 광고 단위의 ID입니다.

### 1-2. 코드 수정

다음 두 파일을 열어 `XXXXXXXXXXXXXXXX`로 표시된 부분을 실제 값으로 변경하세요.

**1) `index.html`**
6번째 줄의 스크립트 태그에서 `client` 값을 수정합니다.
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ACTUAL_ID" ...>
```

**2) `components/ui/AdBanner.tsx`**
15-16번째 줄의 `data-ad-client`와 `data-ad-slot` 값을 수정합니다.
```tsx
<ins className="adsbygoogle block"
     data-ad-client="ca-pub-YOUR_ACTUAL_ID"
     data-ad-slot="YOUR_ACTUAL_SLOT_ID"
     ... >
```

### 1-3. ads.txt 확인
`public/ads.txt` 파일이 생성되었습니다. 이 파일의 내용이 AdSense에서 제공하는 올바른 `ads.txt` 내용과 일치하는지 확인하세요.

---

## 2. 앱 아이콘 변경 (SDK 다운로드 시 적용)

앱을 홈 화면에 추가하거나 바로가기로 설치할 때 `logo.png`가 아이콘으로 사용되도록 설정되었습니다.

### 2-1. 적용 내용
*   **manifest.json**: `public/manifest.json` 파일이 생성되어 앱의 이름과 아이콘(`logo.png`)을 정의합니다.
*   **index.html**: 브라우저 탭 아이콘(favicon)과 설치용 아이콘을 `logo.png`로 설정했습니다.
*   **logo.png**: `assets/logo.png` 파일을 `public/logo.png`로 복사하여 웹 서버 루트에서 접근 가능하게 했습니다.

### 2-2. 확인 방법
1.  웹사이트를 배포합니다.
2.  모바일 크롬이나 사파리에서 접속 후 "홈 화면에 추가"를 실행합니다.
3.  홈 화면에 추가된 아이콘이 `logo.png` 이미지인지 확인합니다.

---

## 3. Flutter WebView 앱 빌드 시 참고사항

현재 이 프로젝트는 웹 프로젝트입니다. 만약 Flutter WebView로 이 웹사이트를 감싸서 앱으로 배포하는 경우, **Flutter 프로젝트 내부의 설정**도 변경해야 앱 아이콘이 바뀝니다.

*   **Android**: `android/app/src/main/res/mipmap-*` 폴더 내의 `ic_launcher.png` 교체
*   **iOS**: `ios/Runner/Assets.xcassets/AppIcon.appiconset` 내부 이미지 교체

이 웹 프로젝트에서의 작업은 "웹사이트 바로가기/PWA 설치" 시의 아이콘을 변경한 것입니다.
