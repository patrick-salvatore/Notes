import React from 'react';
import './message.scss'


function Message(props) {
  return (
    <div className= 'message-wrapper'>
        <h3>{props.msg.author.name}</h3>
        <hr/>
        <p>{props.msg.body}</p>
        <hr/>
        <q>{props.msg.date}</q>
    </div>
  )
}

export default Message