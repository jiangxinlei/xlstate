import React from "react";

export interface ContainerProviderProps<State = void> {
  children: React.ReactNode,
  globalVal?: State,
}

export interface Container<Value, State = void> {
  Provider: React.ComponentType<ContainerProviderProps<State>>,
  useGloContext: () => Value
}

export function createContainer<Value, State = void>(
  states: State,
  reducers: {
    [x: string]: (arg0: any, arg1: { type: React.ReactText; payload: any }) => any; 
  },
): Container<Value, State> {
  const EMPTY: unique symbol = Symbol();

  const Context = React.createContext<Value | typeof EMPTY>(EMPTY);

  function Provider({ globalVal, children }: ContainerProviderProps<State>) {
    const [ reducerStates, dispatch ] = React.useReducer(
      (state: State, action: { type: React.ReactText; payload: any}) => reducers[action.type](state, action),
      states
    );
    return <Context.Provider value={{dispatch, ...reducerStates, globalVal}}>{children}</Context.Provider>
  }

  function useGloContext(): Value {
    let globalState = React.useContext(Context);
    if (globalState === EMPTY) {
      throw new Error("Component must be wrapped with <Container.Provider>")
    }
    return globalState;
  }

  return {
    Provider,
    useGloContext
  }
}