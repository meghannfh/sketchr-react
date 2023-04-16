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

    return (
        <>
            <div className="flex flex-row flex-wrap gap-2 p-3">
                {posts.length > 0 ? posts.map((post) => (
                    <Link to={`/post/${post._id}`} key={post._id}>
                        <PostCard prompt={post.prompt} image={post.image}/>
                    </Link>
                )) : 'no posts to show'}
            </div>
            <AddPostBtn handleShowForm={handleShowForm} />
            {showForm && <AddPostForm />}
        </>
    )
}

export default Feed
