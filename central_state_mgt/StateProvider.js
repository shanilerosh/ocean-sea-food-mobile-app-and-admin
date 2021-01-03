import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

export const StateProvider = ({reducer, initstate, children}) => (
  <StateContext.Provider value={useReducer(reducer, initstate)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
