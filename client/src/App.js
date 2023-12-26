//pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Post from './pages/Post';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddPostForm from './components/forms/AddPostForm';

import greeting from '../src/functions/generateGreeting';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from './reducers/postsSlice';
// import { usePostsContext } from './hooks/usePostsContext';
// import { useAuthContext } from './hooks/useAuthContext';

//axios for HTTP requests
import axios from 'axios';
//default port for all requests
// axios.defaults.baseURL = 'https://sketchr-react-production.up.railway.app/'
axios.defaults.baseURL = 'http://127.0.0.1:8002'


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // const { dispatch } = usePostsContext();
  // const { user } = useAuthContext();
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [randomGreeting, setRandomGreeting] = useState()


  const handleShowAddPostForm = (e) => {
    const target = e.target.id;
    console.log(target)
      setShowAddPostForm(prevShowAddPostForm => !prevShowAddPostForm)
  }

  const handleSetGreeting = () => {
    setRandomGreeting(greeting());
  }

  useEffect(()=> {
    const fetchPosts = async () => {
      //adding authorization to headers in the request
      //we need this in order for the request to check if a user is logged in
      //using the token in the user object
      const headerConfig = {
        headers: {
          Authorization: `Bearer ${user && user.token}`
        }
      };
      const res = await axios.get('/post/feed', headerConfig)
      dispatch(setPosts(res.data))
      // dispatch({type: 'SET_POSTS', payload: res.data})
    }

    if(user){
      fetchPosts()
    }
  }, [dispatch, user])

  return (
    <div>
      <BrowserRouter>
      <div className='fixed left-0 top-0 z-40'>
        <Navbar handleShowAddPostForm={handleShowAddPostForm} randomGreeting={randomGreeting}/>
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
              element={<Signup path="/feed" handleSetGreeting={handleSetGreeting}/>}
            />
            <Route
              path="/login"
              element={<Login path="/feed" handleSetGreeting={handleSetGreeting} />}
            />
            <Route 
              path="/feed"
              element={<Feed handleshowAddPostForm={handleShowAddPostForm}/>}
            />
            <Route
              path="/post/:id"
              element={<Post />}
            />
          </Routes>  
        </div>
      </BrowserRouter>
      {showAddPostForm && 
      <div className='fixed w-screen h-screen top-0 z-40 grid place-content-center border border-red-500 backdrop-blur-sm bg-white/30'>
        <AddPostForm handleShowAddPostForm={handleShowAddPostForm}/>
      </div>}
    </div>
  );
}

export default App;
