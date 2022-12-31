import createStore from "hookmuts";

interface IInitialState {
  count: number,
  post: {
    id: number,
    name: string,
    description: {
      title: string,
      subtitle: string
    }
  }
}

export const {Provider, useSelector, useDispatch} = createStore<IInitialState>({
  initialState: {
    count: 0,
    post: {
      id: 0,
      name: 'first',
      description: {
        title: "Test post",
        subtitle: 'about post'
      }
    }
  }
})
