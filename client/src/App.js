//pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Post from './pages/Post';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddPostForm from './components/AddPostForm';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { usePostsContext } from './hooks/usePostsContext';
import { useAuthContext } from './hooks/useAuthContext';

//axios for HTTP requests
import axios from 'axios';
//default port for all requests
axios.defaults.baseURL = 'http://127.0.0.1:8002'


function App() {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);


  const handleShowForm = () => {
      setShowForm(prevShowForm => !prevShowForm)
  }

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
      dispatch({type: 'SET_POSTS', payload: res.data})
    }

    if(user){
      fetchPosts()
    }
  }, [dispatch, user, headerConfig])

  return (
    <div>
      <BrowserRouter>
      <div className='fixed left-0 top-0 z-40'>
        <Navbar handleShowForm={handleShowForm}/>
      </div>
        <div>
          <Routes>
            <Route
              path="/"
              //the element is what we want to render
              element={<Home />}
            />
            <Route
              path="/signup"
              element={<Signup path="/feed" />}
            />
            <Route
              path="/login"
              element={<Login path="/feed" />}
            />
            <Route 
              path="/feed"
              element={<Feed posts={posts} showForm={showForm}/>}
            />
            <Route
              path="/post/:id"
              element={<Post />}
            />
          </Routes>  
        </div>
      </BrowserRouter>
      {showForm && 
      <div className='absolute top-0 z-40'>
        <AddPostForm />
      </div>}
    </div>
  );
}

export default App;
