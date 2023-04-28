//pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Post from './pages/Post';
import Signup from './pages/Signup';
import Login from './pages/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import { usePostsContext } from './hooks/usePostsContext';
import { useAuthContext } from './hooks/useAuthContext';

//axios for HTTP requests
import axios from 'axios';
//default port for all requests
axios.defaults.baseURL = 'http://127.0.0.1:8002'


function App() {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  //adding authorization to headers in the request
  //we need this in order for the request to check if a user is logged in
  //using the token in the user object

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${user && user.token}` 
   }
  }

  useEffect(()=> {
    const fetchPosts = async () => {
      const res = await axios.get('/post/feed', headerConfig)
      console.log(res.data)
      dispatch({type: 'SET_POSTS', payload: res.data})
    }

    if(user){
      fetchPosts()
    }
  }, [dispatch, user])
  //empty dependencies arr means compnent only renders once

  return (
    <div>
      <BrowserRouter>
      <div className='fixed left-0 top-0 z-20 border-2 border-red-500'>
        <Navbar />
      </div>
        <div className="p-4">
          <Routes>
            <Route
              path="/"
              //the element is what we want to render
              element={<Home />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route 
              path="/feed"
              element={<Feed posts={posts} />}
            />
            <Route
              path="/post/:id"
              element={<Post />}
            />
          </Routes>  
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
