export default function IconBtn({icon, handleClick, btnId}){
    return (
        <span className='transition-colors ease-in-out duration-500 rounded-full p-2 bg-white text-pink-500 hover:bg-pink-500 hover:text-white hover:cursor-pointer' onClick={handleClick}>
            {icon}
        </span>
    )
}