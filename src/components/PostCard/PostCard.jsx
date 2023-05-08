import './postCard.styles.css'
const PostCard = ({post,key}) => {

    return(
        <div className='post-box' key = {key}>
           <h3 className='post-title'>{post.title}</h3>
           <p className='post-body'>{post.body}</p>
        </div>
    )
}

export default PostCard;