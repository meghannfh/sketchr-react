import { FiFilePlus } from 'react-icons/fi';

export default function AddPostBtn({ handleShowForm }){
    return(
        <button onClick={handleShowForm} className='flex flex-row gap-2 items-center transition-colors rounded-full py-1 px-4 bg-white text-pink-500 hover:bg-pink-500 hover:text-white hover:cursor-pointer'>
            <p>new</p><span><FiFilePlus/></span>
        </button>
    )
};