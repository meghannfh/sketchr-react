import { BsPatchPlus } from 'react-icons/bs';

export default function AddPostBtn({ handleShowForm }){
    return(
        <div onClick={handleShowForm} className='text-5xl transition-colors text-black hover:text-pink-500 ease-in-out cursor-pointer'>
            <BsPatchPlus />
        </div>
    )
};