"use client";

import type {FC} from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Types
type MousePosition = {
  x: number;
  y: number;
};
type MouseMoveContextProps = {
  mouseDirection: (main: number) => MousePosition;
  mouseReverse: (main: number) => MousePosition;
};

type ChildrenProps = {
  children: React.ReactNode;
};

export const MouseMoveContext = createContext<MouseMoveContextProps>(
  {} as MouseMoveContextProps
);

export const MouseMoveProvider: FC<ChildrenProps> = ({children}) => {
  const [currentPosition, setCurrentPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const whileMouseMove = useCallback((e: MouseEvent) => {
    setCurrentPosition({
      x: e.clientX - window.innerWidth / 2,
      y: e.clientY - window.innerHeight / 2,
    });
  }, []);

  const mouseDirection = useMemo(() => {
    return (main = 20) => ({
      x: currentPosition.x / main,
      y: currentPosition.y / main,
    });
  }, [currentPosition]);

  const mouseReverse = useMemo(() => {
    return (main = 20) => ({
      x: (currentPosition.x / main) * -1,
      y: (currentPosition.y / main) * -1,
    });
  }, [currentPosition]);

  useEffect(() => {
    window.addEventListener("mousemove", whileMouseMove);
    return () => {
      window.removeEventListener("mousemove", whileMouseMove);
    };
  }, [whileMouseMove]);

  const param = useMemo(
    () => ({
      mouseDirection,
      mouseReverse,
    }),
    [mouseDirection, mouseReverse]
  );

  return (
    <MouseMoveContext.Provider value={param}>
      {children}
    </MouseMoveContext.Provider>
  );
};

export const useMouseMoveUI = () => useContext(MouseMoveContext);
