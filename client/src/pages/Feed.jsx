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

    //AddPostForm needs a higher z-index OR it needs to be moved to the home
    //page the add btn for the form should be in the navbar and only shown
    //when the user is logged in

    return (
        <div className='overflow-hidden border-4 relative mt-20'>
            <div className="flex flex-row flex-wrap justify-center gap-2 p-3">
                {posts.length > 0 ? posts.map((post) => (
                    <PostCard key={post._id} prompt={post.prompt} image={post.image} description={post.description} title={post.prompt} createdAt={post.createdAt}/>
                )) : 'no posts to show'}
            </div>
            <AddPostBtn handleShowForm={handleShowForm} />            
            <div className={showForm ? 'addpost-form' : 'addpost-form show' }>
                <AddPostForm />
            </div>
        </div>
    )
}

export default Feed
