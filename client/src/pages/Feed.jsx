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

    return (
        <div className='relative overflow-hidden border-2 w-screen h-screen mt-32'>
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
