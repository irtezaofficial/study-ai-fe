import {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {AnyObject} from 'yup';

export default function useIndex<T = unknown>(
  defaultArray: T[],
  defaultIndex: number = 0,
  circular: boolean = false,
  cumulativeChecks: string[] = [],
  storeInQuery: boolean = false,
  resetDefaultArray: boolean = false,
  resetDefaultIndex: boolean = false,
) {
  const [array, setArray] = useState(defaultArray);
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  const [params, setParms] = useSearchParams();

  function updateIndex(index: number) {
    setCurrentIndex(index);
    if (storeInQuery) {
      setParms({index: String(index)});
    }
  }

  useEffect(() => {
    if (resetDefaultArray) {
      setArray(defaultArray);
    }
  }, [resetDefaultArray, defaultArray.length]);

  useEffect(() => {
    if (resetDefaultIndex) {
      setCurrentIndex(defaultIndex);
    }
  }, [resetDefaultIndex, defaultIndex]);

  useEffect(() => {
    // if (currentIndex > array.length - 1) {
    //   updateIndex((array.length || 1) - 1);
    // }
    // return () => {
    //   !storeInQuery && handleClear();
    // };
  }, [array.length]);

  useEffect(() => {
    // if (storeInQuery) {
    //   const index = Number(params.get('index'));
    //   if (index <= currentIndex) {
    //     updateIndex(index);
    //   }
    // }
  }, [currentIndex, params]);

  const handleSetCurrent = (index: number) => () => {
    updateIndex(index);
  };

  const handleNext = () => {
    if (currentIndex === array.length - 1 && !circular) return;
    updateIndex((currentIndex + 1) % array.length);
  };

  const handlePrev = () => {
    if (!currentIndex && !circular) return;
    updateIndex((currentIndex - 1 + array.length) % array.length);
  };

  const handleClear = () => updateIndex(0);

  const {next, prev} = getDisabledButtons(array.length, currentIndex);

  const checks = useMemo(() => {
    if (!cumulativeChecks.length) return {};

    return cumulativeChecks.reduce((acc: AnyObject, check) => {
      acc[check] = array.some((item: T) => (item as AnyObject)?.[check]);

      return acc;
    }, {});
  }, [array, cumulativeChecks]);

  const resetArray = (array: Array<T>, resetIndex: boolean = true) => {
    setArray(array);
    if (resetIndex) {
      setCurrentIndex(0);
    }
  };

  return {
    next,
    prev,
    currentIndex,
    handleSetCurrent,
    handleNext,
    handlePrev,
    handleClear,
    checks,
    isFirst: currentIndex === 0,
    isLast: currentIndex === array.length - 1,
    currentItem: array[currentIndex],
    resetArray,
  };
}

function getDisabledButtons(length: number, currentIndex: number) {
  let disableNext = currentIndex === length - 1;
  let disableBack = !currentIndex;
  return {
    next: {
      disabled: disableNext,
      opacity: disableNext ? 0.5 : 1,
    },
    prev: {
      disabled: disableBack,
      opacity: disableBack ? 0.5 : 1,
    },
  };
}
