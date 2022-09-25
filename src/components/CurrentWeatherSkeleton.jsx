import AnimatedPlaceholder from "./AnimatedPlaceholder";

const CurrentWeatherSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col py-12 items-center">
        <AnimatedPlaceholder classProps="max-w-[300px] w-full mb-2" />
        <AnimatedPlaceholder classProps="max-w-[300px] w-full mb-12" />
        <AnimatedPlaceholder classProps="max-w-[300px] h-[100px] w-full mb-12" />
        <AnimatedPlaceholder classProps="max-w-[300px] w-full mb-8" />
        <AnimatedPlaceholder classProps="max-w-[300px] h-[75px] w-full" />
      </div>
    </div>
  );
};

export default CurrentWeatherSkeleton;