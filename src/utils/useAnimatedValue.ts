import { useEffect, useState } from "react";

/**
    @hook function that animates number value loading from initialValue to endValue
    @param initialValue number value that the animation will start from
    @param endValue number value that the animation will go to
    @param start boolean value when the animation should start
    @param animationTime value in ms that the animation should last
 */

export const useAnimatedValue = (
  initialValue: number,
  endValue: number,
  start: boolean,
  animationTime: number
) => {
  const [animatedValue, setAnimatedValue] = useState<number>(0);

  const animate = (value: number) => {
    const time = animationTime / 10 / value;
    let newValue = initialValue;

    const timer = setInterval(() => {
      if (value - newValue > 20) {
        newValue += 1;
      } else if (value - newValue < 20) {
        newValue = newValue + 0.1;
      }
      setAnimatedValue(newValue);
      if (newValue >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
      }
    }, time);
  };

  useEffect(() => {
    if (start) {
      animate(endValue);
    }
  }, [start]);

  return { animatedValue };
};
