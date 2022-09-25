import AnimatedPlaceholder from "./AnimatedPlaceholder";

const HourlyWeatherSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col py-12 px-8 items-center">
        <AnimatedPlaceholder classProps="max-w-screen-md h-[100px] w-full mb-12" />
      </div>
      <div className="flex flex-col py-12 px-8 items-center">
        <AnimatedPlaceholder classProps="max-w-screen-md h-[100px] w-full mb-12" />
      </div>
    </div>
  );
};

export default HourlyWeatherSkeleton;