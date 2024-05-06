// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initalClassName, date} = commentDetails
  const likeText = isLiked ? 'button active' : 'button'
  const initial = name ? name[0].toUpperCase() : ''
  const postedTime = formatDistanceToNow(date)
  const isLikeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const onClickLike = () => {
    const {isToggleLiked} = props
    isToggleLiked(id)
  }
  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }
  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initalClassName}>
          <p className="intial-name">{initial}</p>
        </div>
        <div className="username-time-container">
          <h1 className="data-heading">{name}</h1>
          <p className="time">{postedTime} ago</p>
        </div>
        <p className="data-text">{comment}</p>
      </div>
      <div className="like-delete-container">
        <div className="liked-container">
          <img src={isLikeImageUrl} alt="like" className="like-image" />
          <button className={likeText} type="button" onClick={onClickLike}>
            like
          </button>
        </div>

        <button
          className="delete-btn"
          type="button"
          onClick={onDeleteComment}
          data-textid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            className="delete-image"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
