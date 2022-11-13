import React, { useEffect, useState } from "react";

const useDebounce = (initialState = "", time = 400) => {
  const [debounceValue, setDebounceValue] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initialState);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [initialState, time]);

  return debounceValue;
};

export default useDebounce;
