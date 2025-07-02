import { useEffect } from "react";

// Use to prevent flushSync errors - mainly for chakra-ui toasts

const useMicrotaskEffect = (callback, dependencies) => {
  useEffect(() => {
    Promise.resolve().then(() => {
      callback();
    });
  }, dependencies);
};
export default useMicrotaskEffect;
