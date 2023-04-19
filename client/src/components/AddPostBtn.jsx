import { BsPatchPlus } from 'react-icons/bs';

export default function AddPostBtn({ handleShowForm }){
    return(
        <div onClick={handleShowForm} className='fixed bottom-2 right-2 text-8xl transition-colors text-black hover:text-orange-400 ease-in-out cursor-pointer'>
            <BsPatchPlus />
        </div>
    )
};