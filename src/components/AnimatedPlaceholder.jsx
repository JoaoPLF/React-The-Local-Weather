const AnimatedPlaceholder = ({ classProps }) => {
  return (
    <div className={`bg-gradient-to-r from-gray-100 animate-pulse ${classProps}`}>
      &nbsp;
    </div>
  );
}

export default AnimatedPlaceholder;