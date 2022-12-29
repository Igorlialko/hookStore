import React from 'react';
import './App.css';
import {useSelector} from "./store";
import {useNextCount, usePrevCount} from "./store/mutations/counter";
import {useSetSubtitle} from "./store/mutations/posts";

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

export default App;
