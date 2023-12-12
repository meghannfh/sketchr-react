export default function Button({ handleClick, text, icon, bgLight, textLight }) {

    const btnStyle = (bgLight && bgLight) && (!textLight) ? "flex flex-row gap-2 items-center transition-colors rounded-full py-1 px-4 bg-white text-pink-500 hover:bg-pink-500 hover:text-white hover:cursor-pointer" : "flex flex-row gap-2 items-center transition-colors rounded-full py-1 px-4 bg-pink-500 text-white hover:bg-pink-200 hover:text-white hover:cursor-pointer" 

    return (
        <button className={btnStyle} onClick={handleClick && handleClick}>{text && text}{icon && <span>{icon}</span>}</button>
    )
}