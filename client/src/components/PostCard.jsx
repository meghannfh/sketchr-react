//this is the post component for the feed
import { BsChevronDoubleDown, BsTrash, BsPencilSquare } from 'react-icons/bs';
// import { useAuthContext } from '../hooks/useAuthContext';
import { usePostsContext } from '../hooks/usePostsContext';

import { useState } from 'react';

import axios from 'axios';


export default function PostCard ({ prompt, image, description, title, createdAt, id }) {
  const { dispatch } = usePostsContext();

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  const handleTrashClick = async () => {
    try{
      
      const res = await axios.delete(`/post/deletePost/${id}`)

      if(res.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: res.data })
      }
    }catch(err){

    }
  }

  //bg-gradient-to-t from-black

  return (
    <div className={isExpanded ? 'postcard expand' : 'postcard'}>
      <div className='absolute right-0 bottom-0 z-50'>
      	<div className={isExpanded ? 'chevron up' : 'chevron'} onClick={handleClick}>
          <BsChevronDoubleDown />
        </div>
      </div>

      <div className='absolute right-0 top-0 text-2xl'>
				<span onClick={handleTrashClick}>
					<BsTrash />
				</span>
        <BsPencilSquare />
      </div>
		
      <div className="w-full h-full">
      	<img className="object-cover h-full w-full rounded-md" src={image} alt={prompt}/>
      </div>

      <div className="absolute p-4 h-full w-full backdrop-grayscale bg-black/50 text-white z-10">
      	<div className='w-full'>
        	<h1 className='text-2xl uppercase font-raleway font-bold'>{title}</h1>
          <h3>{createdAt}</h3>
        </div>
        <p className='font-raleway'>{description}</p>
      </div>

    </div>
  )
};
