import { BsPatchPlus } from 'react-icons/bs';

export default function AddPostBtn({ handleShowForm }){
    return(
        <div onClick={handleShowForm} className='absolute bottom-16 right-20 text-8xl transition-colors text-yellow-600 hover:text-orange-500 ease-in-out cursor-pointer'>
            <BsPatchPlus />
        </div>
    )
};