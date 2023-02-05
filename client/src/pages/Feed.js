import Post from '../components/Post'

const Feed = ({ posts }) => {
    return (
        <div className="post-container">
            {posts.map((post) => (
             <Post key={post._id} title={post.prompt} image={post.image}/>
            ))}
        </div>
    )
}

export default Feed
