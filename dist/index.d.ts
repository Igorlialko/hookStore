interface ISelectorHook<TState> {
    <TSelected>(selector: (state: TState) => TSelected, keys: keyof TState): TSelected;
}
declare const createStore: <TInitialState>({ initialState }: {
    initialState: TInitialState;
}) => {
    Provider: ({ children, initialValues }: {
        children: any;
        initialValues?: object | undefined;
    }) => JSX.Element;
    useDispatch: (mutation: (state: TInitialState, payload?: any) => object) => (payload?: any) => void;
    useSelector: ISelectorHook<TInitialState>;
};
export default createStore;
