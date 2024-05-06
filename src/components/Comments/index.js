import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'
const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }
  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }
  isToggleLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onChangeCommentName = event => {
    this.setState({commentInput: event.target.value})
  }
  onChangeInputName = event => {
    this.setState({nameInput: event.target.value})
  }
  renderCommentlist = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        isToggleLiked={this.isToggleLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }
  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialContainerBackgroundClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const addNewComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initalClassName: initialContainerBackgroundClassNames,
    }
    this.setState(prevState => ({
      commentInput: [...prevState.commentsList, addNewComment],
      nameInput: '',
      commentInput: '',
    }))
  }
  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="comment-input-container">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-test">Say something about 4.0 technologies</p>
              <input
                type="text"
                value={nameInput}
                className="input-name"
                placeholder="Your name"
                onChange={this.onChangeInputName}
              />
              <textarea
                className="input-comment"
                value={commentInput}
                placeholder="Your Comment"
                onChange={this.onChangeCommentName}
              />
              <button className="add-button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              className="comment-image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr className="comment-downline" />
        <p className="count-comment">
          <span className="count-comment-number">{commentsList.length}</span>
          Comments
        </p>
        <ul className="comment-list">{this.renderCommentlist()}</ul>
      </div>
    )
  }
}

export default Comments
