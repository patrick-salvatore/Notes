import React, {useState} from 'react';
import {connect} from 'react-redux'
import {deleteMessage} from '../../Actions/MessageActions'

// icons/styles 
import './message.scss'
import DeleteIcon from '@material-ui/icons/Delete';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const setDate = (date) => {
  const getDate = date.split('T')
  return getDate[0]
}

function Message(props) {
  const {message, deletePost} = props
  const [likePost, setLike] = useState(false)
  return (
    <div className= 'message-wrapper'>
      <div className = 'message-header'>
         <h5>{message.author.name}</h5>
         <button className = 'delete-btn' onClick = {() => deletePost(message._id)} ><DeleteIcon/></button>
      </div>
      <div className = 'message-content'>
        <p> {message.body} </p>
      </div>
      <div className = 'message-footer'>
        <button className = '' onClick = {() => setLike(!likePost)}>{likePost ? <FaHeart/> : <FaRegHeart/>}</button> 
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: function(id) {
      return dispatch(deleteMessage(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(Message)

