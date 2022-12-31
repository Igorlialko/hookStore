# hookmuts - React Store

> Say: useReducer NO!

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install hookmuts
```

## Usage

This store was developed for build optimization and ease of use, using both SSR and CSR

## First create a store

Init Store:

```ts
import createStore from "hookStore";

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

```

Then init Provider in your app.
You can use initialValues in

```jsx
<Provider initialValues={{user: userFromServer}}>
  <App/>
</Provider>
```

to init server constants

And you have ```useSelector``` hook by select state:

```jsx
 const [count, post] = useSelector((state) => [state.count, state.post])
```

And ```useDispatch``` - dispatch mutation to store

```tsx
export const usePrevCount = () => useDispatch((state) => {
  return {
    count: state.count - 1,
  }
})

export const useNextCount = () => useDispatch((state) => ({count: state.count + 1}))

export const useSetCount = () => useDispatch((state, payload) => ({count: payload}))

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
```

In Components :

```tsx
function App() {
  const [count, post] = useSelector((state) => [state.count, state.post])
  const prevCount = usePrevCount()
  const nextCount = useNextCount()
  const setSubtitle = useSetSubtitle()
  return (
    <div className="App">
      <h1>App</h1>
      <p>{`Count: ${count}`}</p>
      <button type="button" onClick={() => {
        prevCount()
      }}>
        Prev
      </button>
      <button type="button" onClick={() => {
        nextCount()
      }}>
        Next
      </button>
      <h2>{`Post : ${post.name}`}</h2>
      <p>{post.description.title}</p>
      <p>{post.description.subtitle}</p>
      <input type="text" value={post.description.subtitle}
             onChange={(e) => setSubtitle(e.target.value)}
      />
    </div>
  );
}
```

## Modules

So, you can create many modules :

```ts
import createStore from "hookStore";

export const {Provider, useSelector, useDispatch} = createStore({
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

export const {Provider: AuthProvider, useSelector: useAuthSelector, useDispatch: useAuthDispatch} = createStore({
  initialState: {
    sessionToken: '',
    user: {
      id: 0,
      name: 'Igor',
      email: 'example@gmail.com',
      image: 'https://example.com'
    }
  }
})
```

And use init Providers:

```tsx
<Provider>
  <AuthProvider initialValues={{sessionToken: sessionTokenFromServerCookie, user: userFromServerCookie}}>
    <App/>
  </AuthProvider>
</Provider>
```

**Happy coding!**

## License

MIT © [Igor Lialko](https://github.com/Igorlialko)
