import PostCard from '../components/PostCard'
import AddPostForm from '../components/AddPostForm';
import { Link } from 'react-router-dom';

const Feed = ({ posts }) => {
    return (
        <>
            <div className="flex flex-row gap-2 p-3">
                {posts.map((post) => (
                    <Link to={`/post/${post._id}`}>
                        <PostCard key={post._id} prompt={post.prompt} image={post.image}/>
                    </Link>
                ))}
            </div>
            <AddPostForm />
        </>
    )
}

export default Feed
