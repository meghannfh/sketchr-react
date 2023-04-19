//this is the post component for the feed
import { BsChevronDoubleDown } from 'react-icons/bs';
import { useState } from 'react';

export default function PostCard ({ prompt, image, description }) {

    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(prevIsExpanded => !prevIsExpanded)
    }

    return (
        <div className={isExpanded ? 'postcard expand' : 'postcard'}>
            <div className={isExpanded ? 'chevron up' : 'chevron'} onClick={handleClick}><BsChevronDoubleDown /></div>
            <div className='absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-black'>
                <p className="text-gray-300 absolute left-0 bottom-0 p-2">{description}</p>
            </div>
            <img className="transition object-none object-center" src={image} alt={prompt}/>
            
        </div>
    )
};
