import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard'
// import { Link } from 'react-router-dom';

//maybe add show post form on feed page. add another outer div?

const Feed = () => {
    const posts = useSelector((state) => state.posts.posts)
    const user = useSelector((state) => state.auth.user);
    
    return (
        <>
        {user ? <div className='feed-container'>
            <div className="flex flex-row flex-wrap p-3 justify-center">
                {posts.length > 0 ? posts.map((post) => (
                    <PostCard key={post._id} image={post.file} description={post.description} title={post.title} createdAt={post.createdAt} id={post._id}/>
                )) : 'no posts to show'}
            </div>
        </div> : "please log in"}
        </>
        
    )
}

export default Feed
