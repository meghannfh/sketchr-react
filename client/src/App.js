import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import { usePostsContext } from './hooks/usePostsContext';
import axios from 'axios';
//pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Post from './pages/Post';
import Signup from './pages/Signup';
import Login from './pages/Login';
axios.defaults.baseURL = 'http://127.0.0.1:8002'

function App() {
  // const [posts, setPosts] = useState([])

  const {posts, dispatch} = usePostsContext();
  // console.log(posts)
  useEffect(()=> {
    const fetchPosts = async () => {
      const res = await axios.get('/feed')
      console.log(res.data)
      dispatch({type: 'SET_POSTS', payload: res.data})
    }

    fetchPosts()
  }, [])
  //empty dependencies arr means compnent only renders once

  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <div className="p-4">
          <Routes>
            <Route
              path="/"
              //the element is what we want to render
              element={<Home />}
            />
            <Route 
              path="/feed"
              element={<Feed posts={posts} />}
            />
            <Route
              path="/post/:id"
              element={<Post />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
          </Routes>  
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
