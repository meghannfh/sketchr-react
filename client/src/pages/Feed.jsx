import PostCard from '../components/PostCard'
import AddPostForm from '../components/AddPostForm';
// import { Link } from 'react-router-dom';

const Feed = ({ posts }) => {
    return (
        <div className='feed-container'>
            <div className="flex flex-row flex-wrap gap-2 p-3 justify-center">
                {posts.length > 0 ? posts.map((post) => (
                    <PostCard key={post._id} prompt={post.prompt} image={post.file} description={post.description} title={post.prompt} createdAt={post.createdAt} id={post._id}/>
                )) : 'no posts to show'}
            </div>
        </div>
    )
}

export default Feed
