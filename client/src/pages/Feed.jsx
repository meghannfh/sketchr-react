import PostCard from '../components/PostCard'
import AddPostForm from '../components/AddPostForm';
import AddPostBtn from '../components/AddPostBtn';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Feed = ({ posts }) => {
    const [showForm, setShowForm] = useState(false);

    console.log(showForm)
    const handleShowForm = () => {
        setShowForm(preveShowForm => !preveShowForm)
    }

    // <Link to={`/post/${post._id}`} key={post._id}>
    //                     <PostCard prompt={post.prompt} image={post.image}/>
    //                 </Link>

    //issue with position of feed and login/signup. the css has 100vh & 100vw set for the body on all 
    //then grid center items centers the fees posts
    //we need a seperate class for the login/signup/home pages which will be 100vh and 100vw
    //with display grid.
    return (
        <div className='overflow-hidden mt-20'>
            <div className="flex flex-row flex-wrap gap-2 p-3">
                {posts.length > 0 ? posts.map((post) => (
                    <PostCard key={post._id} prompt={post.prompt} image={post.image} description={post.description}/>
                )) : 'no posts to show'}
            </div>
            <AddPostBtn handleShowForm={handleShowForm} />            
            <div className={showForm ? 'addpost-form' : 'addpost-form show' }>
                <AddPostForm />
                {/*move add post form outside of the feed page otherwise it's bound to the height of the feed */}
            </div>
        </div>
    )
}

export default Feed
