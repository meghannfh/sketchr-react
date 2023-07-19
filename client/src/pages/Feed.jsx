import PostCard from '../components/PostCard'
import AddPostForm from '../components/AddPostForm';
// import { Link } from 'react-router-dom';

const Feed = ({ posts, showForm, handleShowForm }) => {
    // <Link to={`/post/${post._id}`} key={post._id}>
    //                     <PostCard prompt={post.prompt} image={post.image}/>
    //                 </Link>
    return (
        <div className='relative border-4 mt-20'>
            <div className="flex flex-row flex-wrap gap-2 p-3">
                {posts.length > 0 ? posts.map((post) => (
                    <PostCard key={post._id} prompt={post.prompt} image={post.image} description={post.description} title={post.prompt} createdAt={post.createdAt} />
                )) : 'no posts to show'}
            </div>
            <div className={showForm ? 'addpost-form' : 'addpost-form show'}>
                <AddPostForm handleShowForm={handleShowForm}/>
            </div>
        </div>
    )
}

export default Feed
