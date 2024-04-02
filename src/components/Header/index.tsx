import FeatureBar from './FeatureBar';

const Header = () => {
  return (
    <header className="flex h-[116px] w-full items-center justify-between gap-12 border-b-[5px] border-solid border-b-[#0F62FE] py-4 pl-[30px] pr-10">
      <h1 className="whitespace-nowrap text-left text-xl font-bold leading-[22px]">
        Dicom Viewer (with Cornerstone.js)
      </h1>
      <FeatureBar />
    </header>
  );
};

export default Header;
