import {useDispatch} from "../index";

export const useSetSubtitle = () => useDispatch((state, payload) => {
  return {
    post: {
      ...state.post,
      description: {
        ...state.post.description,
        subtitle: payload
      }
    }
  }
})
