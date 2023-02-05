import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'

function App() {
  const [posts, setPosts] = useState([])

    useEffect(()=> {
        const fetchPosts = async () => {
            const res = await fetch('/feed')
            const data = await res.json()

            if (res.ok){
                setPosts(data)
            }
        }

        fetchPosts()
    }, [])
    //empty dependencies arr means compnent only renders once

  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <div className="pages">
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
          </Routes>  
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
