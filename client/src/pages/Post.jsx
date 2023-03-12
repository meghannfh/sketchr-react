import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCardInfoCard from '../components/PostCardInfoCard';
import axios from 'axios';

export default function Post(){
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(()=> {
        const fetchPost = async () => {
          const res = await axios.get(`/post/${id}`)
            console.log(res.data)
            setPost(res.data)
        }
        fetchPost()
    }, [])

    if(!post) {
        return <div>Loading...</div>
    }

    return(
        <div>
            <PostCardInfoCard post={post} />
        </div>
    )
}