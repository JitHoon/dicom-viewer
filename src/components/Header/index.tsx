import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';

const Header = ({ currentEl }: { currentEl: HTMLDivElement | undefined }) => {
  const zoomHandler = () => {
    cornerstoneTools.setToolActiveForElement(currentEl, 'ZoomMouseWheel', {
      mouseButtonMask: 1
    });
  };

  const flipHHandler = () => {
    cornerstoneTools.setToolEnabledForElement(currentEl, 'ZoomMouseWheel', {
      mouseButtonMask: 1
    });

    if (currentEl) {
      const viewport = cornerstone.getViewport(currentEl);

      if (viewport) {
        viewport.hflip = !viewport.hflip;
        cornerstone.setViewport(currentEl, viewport);
      }
    }
  };

  const flipVHandler = () => {
    cornerstoneTools.setToolEnabledForElement(currentEl, 'ZoomMouseWheel', {
      mouseButtonMask: 1
    });

    if (currentEl) {
      const viewport = cornerstone.getViewport(currentEl);

      if (viewport) {
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(currentEl, viewport);
      }
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
          <button className="feat-btn">Rotate Delta 30</button>
          <button className="feat-btn">Invert</button>
          <button className="feat-btn">Apply Colormap</button>
          <button className="feat-btn">Reset</button>
        </div>
        <button className="img-btn">
          <span className="px-2">Previous Image</span>
        </button>
        <button className="img-btn">
          <span className="px-2">Next Image</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
