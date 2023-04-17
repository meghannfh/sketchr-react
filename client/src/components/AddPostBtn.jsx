import { BsPatchPlus } from 'react-icons/bs';

export default function AddPostBtn({ handleShowForm }){
    return(
        <div onClick={handleShowForm} className='absolute bottom-20 right-10 text-8xl transition-colors text-white hover:text-orange-400 ease-in-out cursor-pointer'>
            <BsPatchPlus />
        </div>
    )
};