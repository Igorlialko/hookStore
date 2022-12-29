import {useDispatch} from "../index";

export const usePrevCount = () => useDispatch((state) => {
  return {
    count: state.count - 1,
  }
})

export const useNextCount = () => useDispatch((state) => {
  return {
    count: state.count + 1
  }
})
