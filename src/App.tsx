import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import Hammer from 'hammerjs';

import Header from '@components/Header';
import { createRef, useEffect, useState } from 'react';

function App() {
  const dicomARef = createRef<HTMLDivElement>();
  const dicomBRef = createRef<HTMLDivElement>();
  const [currentEl, setCurrentEl] = useState<HTMLDivElement>();
  const [currentImageA, setCurrentImageA] = useState<number>(0);
  const [currentImageB, setCurrentImageB] = useState<number>(1);

  const imageId_1 =
    'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg';
  const imageId_2 =
    'https://www.asteris.biz/Keystone/ImageDownload.aspx?ClinicCode=TESTKEYSTONE&ImageId=01b1755e-33d1-4b24-b9af-a4a019689d5f&ImageType=PreviewImage&FrameIndex=0';
  const imageIds = [imageId_1, imageId_2];

  useEffect(() => {
    // init cornerstoneTools
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneWebImageLoader.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;

    cornerstoneTools.init();

    const dicomA = dicomARef.current;
    const dicomB = dicomBRef.current;

    if (dicomA && dicomB) {
      cornerstone.enable(dicomA);
      cornerstone.enable(dicomB);

      setCurrentEl(dicomA);

      // add & active ZoomTool
      cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool);
      cornerstoneTools.addTool(cornerstoneTools.ZoomTool);

      cornerstoneTools.setToolActive('ZoomMouseWheel', {
        mouseButtonMask: 1
      });

      // display
      cornerstone.loadAndCacheImage(imageIds[currentImageA]).then(image => {
        cornerstone.displayImage(dicomA, image);
      });
      cornerstone.loadAndCacheImage(imageIds[currentImageB]).then(image => {
        cornerstone.displayImage(dicomB, image);
      });
    } else {
      alert('이미지를 불러올 수 없습니다.');
    }

    return () => {
      if (dicomA && dicomB) {
        cornerstone.disable(dicomA);
        cornerstone.disable(dicomB);
      }
    };
  }, []);

  const changeElementBtoA = () =>
    setCurrentEl(pre => {
      const dicomA = dicomARef.current;
      if (dicomA && pre !== dicomA) {
        return dicomA;
      } else return pre;
    });

  const changeElementAtoB = () =>
    setCurrentEl(pre => {
      const dicomB = dicomBRef.current;
      if (dicomB && pre !== dicomB) {
        return dicomB;
      } else return pre;
    });

  // change imageA
  useEffect(() => {
    if (currentEl) {
      cornerstone.loadAndCacheImage(imageIds[currentImageA]).then(image => {
        cornerstone.displayImage(currentEl, image);
      });
    }
  }, [currentImageA]);

  // change imageB
  useEffect(() => {
    if (currentEl) {
      cornerstone.loadAndCacheImage(imageIds[currentImageB]).then(image => {
        cornerstone.displayImage(currentEl, image);
      });
    }
  }, [currentImageB]);

  return (
    <>
      <Header
        currentEl={currentEl}
        setCurrentImageA={setCurrentImageA}
        setCurrentImageB={setCurrentImageB}
        imageIds={imageIds}
      />
      <main className="box-border flex h-[85vh] w-full items-center justify-center">
        <div
          id="A"
          className="mt-[5px] box-border h-full w-full border-r-[5px] border-solid border-r-[#0F62FE] pr-[5px]"
          ref={dicomARef}
          onClick={changeElementBtoA}
        ></div>
        <div
          id="B"
          className="mt-[5px] box-border h-full w-full border-l-[5px] border-solid border-l-[#0F62FE] pl-[5px]"
          ref={dicomBRef}
          onClick={changeElementAtoB}
        ></div>
      </main>
    </>
  );
}

export default App;
