import Post from '../components/Post'
import AddPostForm from '../components/AddPostForm';
import { Link } from 'react-router-dom';

const Feed = ({ posts }) => {
    return (
        <>
            <Link to="/:id">
                <div className="post-container">
                    {posts.map((post) => (
                        <Post key={post._id} title={post.prompt} image={post.image}/>
                    ))}
                </div>
            </Link>
            <AddPostForm />
        </>
    )
}

export default Feed
