import { DependencyList, useCallback, useEffect, useRef } from 'react';

type Input = {
  cb(): void;
  interval: number;
  deps?: DependencyList;
};

export const useInterval = ({ interval, cb, deps = [] }: Input) => {
  const intervalRef = useRef<number>();
  const restartRef = useRef<boolean>();

  useEffect(() => {
    cb();
    const startInterval = () => {
      intervalRef.current = window.setInterval(() => {
        cb();
      }, interval);
    };
    startInterval();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [interval, restartRef.current, ...deps]);

  const restart = useCallback(() => {
    clearInterval(intervalRef.current);
    restartRef.current = !restartRef.current;
  }, [restartRef.current]);

  return {
    restart,
  };
};
