//this is the post component for the feed
import { BsChevronDoubleDown, BsTrash, BsPencilSquare } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostsContext } from '../hooks/usePostsContext';

import { useState } from 'react';

import axios from 'axios';


export default function PostCard ({ prompt, image, description, title, createdAt }) {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
	const { id } = useParams();

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${user && user.token}` 
    }
  }
    
  const handleDeletePost = async(id) => {

    if(user){
      try {
				const res = await axios.delete(`/post/deletePost/${id}`, headerConfig)

				dispatch({ type: 'DELETE_POST', payload: res.data });
			}catch (err){
      	console.log(err)
      }
    }
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  //bg-gradient-to-t from-black

  return (
    <div className={isExpanded ? 'postcard expand' : 'postcard'}>
      <div className='absolute right-0 bottom-0'>
      	<div className={isExpanded ? 'chevron up' : 'chevron'} onClick={handleClick}> <BsChevronDoubleDown /></div>
      	</div>
      	<div className='absolute right-0 top-0 text-2xl'>
					<span onClick={handleDeletePost}>
						<BsTrash />
					</span>
      	  
      	  <BsPencilSquare />
      	</div>
		
      	<div className="w-1/3 h-full">
      	  <img className="object-cover h-full w-full rounded-md" src={image} alt={prompt}/>
      	</div>
      	<div className="p-4 h-full w-2/3">
      		<div className='w-full'>
      	  	<h1 className='text-2xl uppercase font-raleway font-bold'>{title}</h1>
      	    <h3>{createdAt}</h3>
      	  </div>
      	  <p className='font-raleway'>{description}</p>
      </div>
    </div>
  )
};
