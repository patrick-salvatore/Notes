import React, { Component } from 'react';
import {connect} from 'react-redux'

import {fetchMessages} from '../../Actions/MessageActions'

// components 
import NavBar from '../NavBar/NavBar';
import ModalWrapper from '../Modal/ModalWrapper';
import MessageList from '../Message/MessageList';

class Board extends Component {
 
  async componentWillMount() {
   await this.props.fetchPosts()
  }

  render() {
    return (
      <div>
        <MessageList /> 
        <ModalWrapper/>
        <NavBar/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: function(){
      return dispatch(fetchMessages())
    }
  } 
}

export default connect(null, mapDispatchToProps)(Board);
