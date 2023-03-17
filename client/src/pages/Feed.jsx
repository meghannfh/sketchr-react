import PostCard from '../components/PostCard'
import AddPostForm from '../components/AddPostForm';
import AddPostBtn from '../components/AddPostBtn';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Feed = ({ posts }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className="border-2 flex flex-row flex-wrap gap-2 p-3">
                {posts.map((post, idx) => (
                    <Link to={`/post/${post._id}`}>
                        <PostCard key={post._id} prompt={post.prompt} image={post.image}/>
                    </Link>
                ))}
            </div>
            <AddPostBtn />
            <AddPostForm />
        </>
    )
}

export default Feed
