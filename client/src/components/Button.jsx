export default function Button({ handleClick, text, icon }) {
    return (
        <button className="flex flex-row gap-2 items-center transition-colors rounded-full py-1 px-4 bg-white text-pink-500 hover:bg-pink-500 hover:text-white hover:cursor-pointer" onClick={handleClick}>{text}{icon && <span>{icon}</span>}</button>
    )
}