//this is the post component for the feed
export default function PostCard ({ prompt, image }) {
    return (
        <div className="relative w-64 h-64 overflow-hidden">
            <img className="object-cover w-64 h-64" src={image} alt={prompt}/>
            <h1 className="absolute bottom-0 bg-slate-800/75 w-full p-2 text-white">{prompt}</h1>
        </div>
    )
}
