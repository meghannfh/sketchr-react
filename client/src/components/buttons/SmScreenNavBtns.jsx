export default function SmScreenNavBtns ({ text }) {
    return (
        <span className="flex md:hidden">
            <button className="transition-colors hover:text-pink-500">{text}</button>
        </span>
    )
}