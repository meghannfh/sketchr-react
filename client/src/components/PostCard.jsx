//this is the post component for the feed
import { BsChevronDoubleDown } from 'react-icons/bs';
import { useState } from 'react';

export default function PostCard ({ prompt, image, description, title, createdAt }) {

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
            
            <div className="w-1/3 h-full">
                <img className="object-cover h-full w-96 " src={image} alt={prompt}/>
            </div>
            <div className="p-4 h-full w-2/3">
            <div className='w-full flex justify-between'>
                    <h1 className='text-3xl uppercase font-raleway'>{title}</h1>
                    <h3>{createdAt}</h3>
                </div>
                <p className='text-lg font-raleway'>{description}</p>
            </div>
        </div>
    )
};
