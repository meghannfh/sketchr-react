//this is the post component for the feed
import { FiEdit, FiTrash2 } from 'react-icons/fi';
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
    <div className={isExpanded ? 'postcard expand' : 'postcard'} onClick={handleClick}>
      <div className="w-full h-full">
      	<img className="object-cover h-full w-full rounded-md" src={image} alt={prompt}/>
      </div>

      <div className="absolute p-4 h-full w-full text-white z-10 image-filter remove-filter">
      	<div className='w-full card-text card-text-disappear'>
        	<h1 className='text-2xl uppercase font-raleway font-bold'>{title}</h1>
          <h3>{createdAt}</h3>
          <p className='font-raleway'>{description}</p>
        </div>
        <div className='absolute right-2 bottom-2 text-2xl flex flex-row gap-1'>
				<span onClick={handleTrashClick} className='transition-colors ease-in-out duration-500 rounded-full p-2 bg-white text-pink-500 hover:bg-pink-500 hover:text-white hover:cursor-pointer'>
					<FiTrash2 />
				</span>
        <span className='transition-colors ease-in-out duration-500 rounded-full p-2 bg-white text-pink-500 hover:bg-pink-500 hover:text-white hover:cursor-pointer'>
          <FiEdit />
        </span>
      </div>
      </div>

    </div>
  )
};
