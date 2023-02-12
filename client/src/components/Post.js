const Post = ({ title, image }) => {
    return (
        <div>
            <h1>{title}</h1>
            <img src={image} className="post-image" alt={title}/>
        </div>
    )
}

export default Post