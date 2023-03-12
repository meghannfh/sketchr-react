//this is the post component for the feed
export default function PostCard ({ prompt, image }) {
    return (
        <div>
            <h1>{prompt}</h1>
            <img src={image} alt={prompt}/>
        </div>
    )
}
