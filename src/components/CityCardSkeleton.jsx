import AnimatedPlaceholder from "./AnimatedPlaceholder";

const CityCardSkeleton = () => {
  return (
    <div className="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md">
      <div className="flex flex-col flex-1 gap-2">
        <AnimatedPlaceholder classProps="max-w-[50%]" />
        <AnimatedPlaceholder classProps="max-w-[40%]" />
      </div>

      <div className="flex flex-col items-end flex-1 gap-2">
        <AnimatedPlaceholder classProps="max-w-[50px] w-full" />
        <AnimatedPlaceholder classProps="max-w-[75px] w-full" />
      </div>
    </div>
  );
};

export default CityCardSkeleton;