type TwoColumnLayoutProps = {
  mainContent: JSX.Element;
  rightContent: JSX.Element;
};

const TwoColumnLayout = ({
  mainContent,
  rightContent,
}: TwoColumnLayoutProps) => {
  return (
    <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      {/* Left sidebar & main wrapper */}
      <div className="flex-1 min-w-0 bg-white xl:flex">
        <div className="bg-white lg:min-w-0 lg:flex-1">
          <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
            {/* Start main area*/}
            <div className="relative h-full" style={{ minHeight: '36rem' }}>
              <div className="absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg">
                {mainContent}
              </div>
            </div>
            {/* End main area */}
          </div>
        </div>
        <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
          <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            {/* Start left column area */}
            <div className="h-full relative" style={{ minHeight: '12rem' }}>
              <div className="absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg">
                {rightContent}
              </div>
            </div>
            {/* End left column area */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
