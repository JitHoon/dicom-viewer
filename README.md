# DICOM Viewer

> 해당 프로젝트는 DICOM(Digital Imaging and Communications in Medicine) 이미지를 다루는 웹프로그램을 구현합니다.

![image](https://github.com/JitHoon/dicom-viewer/assets/101972330/4caf0dbd-8c5b-4e50-913a-b6ff264f60b2)

## Contributor

- @[Jithoon](https://github.com/JitHoon) (최지훈)

## Tech Requirment

- React 18.x
- TypeScript
- Cornerstone.js 2.x
- Vite (react-swc-ts)
- Tailwind
- Github Actions (Vercel)

### What is Vite (react-swc-ts)

```Shell
$ npm create vite@latest dicom-viewer -- --template react-swc-ts
```

This template provides a minimal setup to get React working in Vite with [HMR(Hot Module Replacement)](https://webpack.kr/concepts/hot-module-replacement/) and some ESLint rules.

### Why Vite (react-swc-ts)

> Babel vs. Speedy Web Compiler

Babel은 최신 자바스크립트 문법으로 작성된 코드를 구버전 브라우저도 이해할 수 있는 수준의 오래된 자바스크립트 코드로 변환해 주는 트랜스파일러입니다.

SWC는 자바스크립트 프로젝트의 컴파일과 번들링 모두에 사용될 수 있는, Rust라는 언어로 제작된 빌드 툴입니다. 말 그대로 매우 빠른 웹 컴파일러의 기능을 제공하는 툴입니다.

Next.js에서는 SWC로 교체함으로써 트랜스파일링은 무려 17배나 빨라졌다고 하며, 코드 경량화 작업은 7배가 빨라졌다고 합니다.

SWC라는 툴이 바벨보다 월등하게 빠른 가장 큰 이유는 바로 Rust라는 프로그래밍 언어가 `이벤트 루프 기반의 싱글 스레드 언어`인 자바스크립트와는 다르게 `병렬 처리(물류 센터로 치면 여러 개의 컨베이어 벨트)`가 가능하도록 설계되었기 때문에, Rust 언어로 작성된 SWC는 의존성이 없는 파일들을 동시에 변환할 수 있습니다.

레퍼런스 : [kakao FE 기술 블로그](https://fe-developers.kakaoent.com/2022/220217-learn-babel-terser-swc/)

### Vite + Tailwind

```Shell
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

레퍼런스 : [Tailwindcss Documentation](https://tailwindcss.com/docs/guides/vite)

## Feature

1. Zoom: 이미지를 확대합니다. (O)
   ![zoom](https://github.com/JitHoon/dicom-viewer/assets/101972330/e72fe24d-a3b3-49a2-a2d6-7e530d37476c)

2. Flip H & Flip V: 이미지를 좌우, 상하로 반전시킵니다. (O)
   ![flip](https://github.com/JitHoon/dicom-viewer/assets/101972330/688d9351-912f-4a1e-9fab-80c956b6fc22)

3. Rotate Delta 30: 이미지를 시계방향으로 30도 회전시킵니다. (O)
   ![rotate](https://github.com/JitHoon/dicom-viewer/assets/101972330/aea7ed88-79cb-4c24-bc49-ac2dbb95b5d3)

4. Invert: 이미지 색상을 반전시킵니다. (O)
   ![invert](https://github.com/JitHoon/dicom-viewer/assets/101972330/3aea8b64-76f0-4036-aef4-57dec19d16de)

5. Apply Colormap: 이미지의 픽셀 값에 따라 색상을 지정시킵니다. (X)

```tsx
// 시도한 코드

// ...

const colormapHandler = () => {
  if (currentEl) {
    cornerstoneTools.setToolEnabledForElement(currentEl, 'ZoomMouseWheel', {
      mouseButtonMask: 1
    });

    const viewport = cornerstone.getViewport(currentEl);
    const colormap = cornerstone.colors.getColormap('jet', { name: 'Jet' });

    if (viewport) {
      viewport.colormap = colormap;

      cornerstone.setViewport(currentEl, viewport);
      cornerstone.updateImage(currentEl, true);
    }
  }
};

// ...

<button className="feat-btn" onClick={colormapHandler}>
  Apply Colormap
</button>;
```

7. Reset: 이미지를 원래 상태로 되돌립니다. (O)
   ![reset](https://github.com/JitHoon/dicom-viewer/assets/101972330/2446f37a-6a2c-40c1-a730-5a01ccebc37c)

8. Previous & Next Image: 이전 및 다음 이미지로 전환합니다. (O)
   ![move](https://github.com/JitHoon/dicom-viewer/assets/101972330/0f7ecc5f-e299-4b1f-bcb0-bbe85ab8013c)

## Script

### 로컬 앱 실행

```Shell
$ npm run build
$ npm run dev
```

## Reference

- [Cornerstone Docs](https://www.cornerstonejs.org/docs/getting-started/overview)
- [Cornerstone Github](https://github.com/cornerstonejs/cornerstone/tree/master)
- [Cornerstone React Class Component Example](https://codesandbox.io/p/sandbox/xj172zjx5w?file=%2Fsrc%2Findex.js&from-embed=)
- [CornerstoneTools.js Document](https://tools.cornerstonejs.org/)
- [CornerstoneTools Examples](https://tools.cornerstonejs.org/examples/)
- [CornerstoneTools API](https://tools.cornerstonejs.org/api/#setViewport)
