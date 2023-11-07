/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useCallback, useEffect, useState} from "react";

export const useMediaQuery = (width: any) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: {matches: any}) => {
    if (e.matches) setTargetReached(true);
    else setTargetReached(false);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true);

    return () => {
      media.removeEventListener("change", updateTarget);
    };
  }, [updateTarget, width]);

  return targetReached;
};
