//this is the post component for the feed
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { useState } from 'react';

import axios from 'axios';


export default function PostCard ({ image, description, title, createdAt, id }) {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${user && user.token}` 
   }
  }

  const [isExpanded, setIsExpanded] = useState(false)
  const [descriptionIsDisplayed, setDescriptionIsDisplayed] = useState(false)

  const handleExpandClick = () => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
    setDescriptionIsDisplayed(prevDescriptionIsDiplayed => !prevDescriptionIsDiplayed)
  }
 
  const handleTrashClick = async () => {
    console.log('clicked')
    const res = await axios.delete('/post/deletePost/'+id, headerConfig)

    console.log(res.data)
    dispatch({ type: 'DELETE_POST', payload: res.data })
  }
  return (
    // <div className={isExpanded ? 'postcard expand' : 'postcard'}>
    <div className={isExpanded ? 'postcard expand' : 'postcard'} onClick={handleExpandClick}>
      <div className="w-full h-full">
      	<img className="object-cover h-full w-full" src={image} alt={prompt}/>
      </div>

      <div className="absolute p-4 h-full w-full text-white z-20 image-filter remove-filter">
      	<div className='w-full card-text card-text-disappear'>
        	<h1 className='text-2xl uppercase font-raleway font-bold'>{title}</h1>
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

      <div className={descriptionIsDisplayed ? "description-styles show-description-styles" : "description-styles"}>
        <p className="absolute left-0 bottom-0 w-full p-4">{description}</p>
      </div>

    </div>
  )
};
