import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'
import Post from './pages/Post'
axios.defaults.baseURL = 'http://127.0.0.1:8002'

function App() {
  const [posts, setPosts] = useState([])

  console.log(posts)
    useEffect(()=> {
        const fetchPosts = async () => {
          const res = await axios.get('/feed')
            // const res = await fetch('/feed')
            // const data = await res.json()
            console.log(res.data)
            setPosts(res.data)
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
              element={
                <>
                {posts.length > 0 ? <Feed posts={posts} /> : 'no posts to show'}
                </>
              }
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
