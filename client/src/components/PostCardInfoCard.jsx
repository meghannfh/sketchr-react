//this is the individual post component on the Post page
// import { usePostsContext } from '../hooks/usePostsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import axios from 'axios'

export default function PostCardInfoCard({ post }) {
    
    return (
        <div>
            <h1>{post.prompt}</h1>
            <img src={post.image} alt={post.prompt}/>
            <h2>What I like about this piece:</h2>
            <p>{post.description}</p>
            <h3>Size:</h3>
            <p>{post.size}</p>
            <h3>Media:</h3>
            <p>{post.media}</p>
            <h3>Canvas:</h3>
            <p>{post.canvas}</p>
        </div>
    )
}