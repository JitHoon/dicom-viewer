import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';

const Header = ({
  currentEl,
  setCurrentImageA,
  setCurrentImageB,
  imageIds
}: {
  currentEl: HTMLDivElement | undefined;
  setCurrentImageA: React.Dispatch<React.SetStateAction<number>>;
  setCurrentImageB: React.Dispatch<React.SetStateAction<number>>;
  imageIds: string[];
}) => {
  const zoomHandler = () => {
    cornerstoneTools.setToolActiveForElement(currentEl, 'ZoomMouseWheel', {
      mouseButtonMask: 1
    });
  };

  const flipHHandler = () => {
    if (currentEl) {
      const viewport = cornerstone.getViewport(currentEl);

      if (viewport) {
        viewport.hflip = !viewport.hflip;
        cornerstone.setViewport(currentEl, viewport);
      }
    }
  };

  const flipVHandler = () => {
    if (currentEl) {
      const viewport = cornerstone.getViewport(currentEl);

      if (viewport) {
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(currentEl, viewport);
      }
    }
  };

  const rotateHandler = () => {
    if (currentEl) {
      const viewport = cornerstone.getViewport(currentEl);

      if (viewport) {
        viewport.rotation += 30;
        cornerstone.setViewport(currentEl, viewport);
      }
    }
  };

  const invertHandler = () => {
    if (currentEl) {
      const viewport = cornerstone.getViewport(currentEl);

      if (viewport) {
        viewport.invert = !viewport.invert;
        cornerstone.setViewport(currentEl, viewport);
      }
    }
  };

  const colormapHandler = () => {
    if (currentEl) {
      const viewport = cornerstone.getViewport(currentEl);
      const colormap = cornerstone.colors.getColormap('jet', { name: 'Jet' });

      if (viewport) {
        viewport.colormap = colormap;

        cornerstone.setViewport(currentEl, viewport);
        cornerstone.updateImage(currentEl, true);
      }
    }
  };

  const resetHandler = () => {
    if (currentEl) {
      cornerstone.reset(currentEl);
    }
  };

  const previousHeandler = () => {
    if (currentEl?.id === 'A') {
      setCurrentImageA(pre => Math.abs(pre - 1) % imageIds.length);
    } else if (currentEl?.id === 'B') {
      setCurrentImageB(pre => Math.abs(pre - 1) % imageIds.length);
    }
  };

  const nextHandler = () => {
    if (currentEl?.id === 'A') {
      setCurrentImageA(pre => (pre + 1) % imageIds.length);
    } else if (currentEl?.id === 'B') {
      setCurrentImageB(pre => (pre + 1) % imageIds.length);
    }
  };

  return (
    <header className="box-border flex h-[116px] w-full items-center justify-between gap-12 border-b-[5px] border-solid border-b-[#0F62FE] px-[30px] py-[47px]">
      <h1 className="whitespace-nowrap text-left text-xl font-bold leading-[10px]">
        Dicom Viewer (with Cornerstone.js)
      </h1>
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center justify-between gap-4">
          <button className="feat-btn" onClick={zoomHandler}>
            Zoom
          </button>
          <button className="feat-btn" onClick={flipHHandler}>
            Flip H
          </button>
          <button className="feat-btn" onClick={flipVHandler}>
            Filp V
          </button>
          <button className="feat-btn" onClick={rotateHandler}>
            Rotate Delta 30
          </button>
          <button className="feat-btn" onClick={invertHandler}>
            Invert
          </button>
          <button className="feat-btn" onClick={colormapHandler}>
            Apply Colormap
          </button>
          <button className="feat-btn" onClick={resetHandler}>
            Reset
          </button>
        </div>
        <button className="img-btn" onClick={previousHeandler}>
          <span className="px-2">Previous Image</span>
        </button>
        <button className="img-btn" onClick={nextHandler}>
          <span className="px-2">Next Image</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
