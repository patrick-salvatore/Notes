import React from 'react';
import {connect} from 'react-redux';
import Message from './Message';

const MessageList = (props) => {
  const {messages} =  props
  
   return (
     <div style= {styles}> 
      {messages.messages.length > 0 && messages.messages.map((message, i) => (
        <Message
          key = {i}
          message = {message}
          />
      ))}
     </div>
   )
}

const styles = {
  marginBottom: '64px',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column', 
  display: 'flex',
}

const mapStateToProps =  (state) => {
  return {
    messages: state
  }
}

export default connect(mapStateToProps, null)(MessageList);
