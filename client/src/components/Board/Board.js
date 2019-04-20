import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import ModalWrapper from '../Modal/ModalWrapper';
import MessageList from '../Message/MessageList';


 class Board extends Component {
  render() {
    return (
      <div>
        <MessageList/> 
        <ModalWrapper/>
        <NavBar/>
      </div>
    )
  }
}
export default Board;