"use client";

import type {Dispatch} from "react";
import type React from "react";
import {createContext, useReducer} from "react";

type StateType = {
  toggleMenu: boolean;
};

type ActionType = {
  type: string;
};

const initialState: StateType = {
  toggleMenu: false,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,
        toggleMenu: !state.toggleMenu,
      };
    default:
      return state;
  }
};

export const MenuContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({state: initialState, dispatch: () => null});

export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MenuContext.Provider value={{state, dispatch}}>
      {children}
    </MenuContext.Provider>
  );
};
