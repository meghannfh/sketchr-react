//this is the post component for the feed
import { BsChevronDoubleDown } from 'react-icons/bs';

export default function PostCard ({ prompt, image }) {
    return (
        <div className="relative border-4 border-orange-200 w-96 h-48 rounded-lg overflow-hidden">
            <img className="transition object-none object-center brightness-50 sepia hover:sepia-0 hover:brightness-100 ease-in-out" src={image} alt={prompt}/>
            <div className="absolute bottom-0 right-0 p-2 text-6xl transition-color text-white hover:text-orange-500 ease"><BsChevronDoubleDown /></div>
        </div>
    )
};
