import React, {createContext, useContext, useMemo, useState} from 'react';

interface ISelectorHook<TState> {
  <TSelected>(selector: (state: TState) => TSelected): TSelected;
}

interface IInitContext<TState> {
  dispatch: (setter: (state: TState) => object) => void;
}

const createStore = <TInitialState, >({
                            initialState
                          }: {
  initialState: TInitialState
}) => {

  type GlobalContextType = typeof initialState;

  const StateContext = createContext({} as GlobalContextType);
  const DispatchContext = createContext({} as IInitContext<GlobalContextType>);

  const useDispatch = (mutation: (state: GlobalContextType, payload?: any) => object) => {
    const {dispatch} = useContext<IInitContext<GlobalContextType>>(DispatchContext)

    return (payload?: any) => {
      dispatch((state: GlobalContextType) => mutation(state, payload));
    };
  };

  const useSelector: ISelectorHook<GlobalContextType> = (selector) => {
    const state: GlobalContextType = useContext(StateContext)
    return selector(state);
  };


  const Provider = ({children, initialValues}: { children: any, initialValues?: object }) => {
    const [state, setState] = useState<GlobalContextType>({...initialState, ...initialValues});

    const valueDispatch = useMemo(() => ({
      dispatch: (setter: (state: GlobalContextType) => object) => {
        setState((prevState) => ({
          ...prevState,
          ...setter(prevState),
        }));
      }
    }), [setState])

    return <DispatchContext.Provider value={valueDispatch}>
      <StateContext.Provider
        value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>;
  }

  return {
    Provider,
    useDispatch,
    useSelector
  }
}

export default createStore;
