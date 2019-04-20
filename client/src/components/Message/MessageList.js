import React from 'react';
import {deleteMessage} from "../../Actions/MessageActions";
import {connect} from 'react-redux';
import Message from './Message';

const MessageList = ({messages, deleteMessage}) => {
   return (
     <div style= {styles}>
       {messages.map(msg => {
         return (
            <Message
              msg = {msg}
              onDelete = {deleteMessage}
              key = {msg._id}
            >
            </Message>
        )
       })}
     </div>
   )
}

const styles = {
  margin: '0 auto',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column', 
  display: 'flex',
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    OndeletePost: function(id) {
      return dispatch(deleteMessage(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageList);
