import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {connect} from 'react-redux';
import {postMessage} from '../../Actions/MessageActions';

import './modal.scss';

const root = document.getElementById('root');

class Modal extends Component {
  constructor(props) {
     super (props)
     this.state = {
         showModal: false,
         formFields: {
           message: ''
         }
        }
      }

  inputChangeHandler = (e) => {
    let formFields = {...this.state.formFields}; 
    formFields[e.target.name] = e.target.value;
    this.setState({formFields});
  }
    
  handleShowModal = () => {
      this.setState({
          showModal: !this.state.showModal
      })
  }
        
  messsageSubmit = (e) => {
    e.preventDefault()
    let messageData = {...this.state.formFields}
    this.props.onAddPost(messageData)
    this.handleShowModal()
  }

  render() {
    return (
      <div>
          <StyledButton color="secondary" aria-label="Add" onClick = {this.handleShowModal} >
              <AddIcon/>
          </StyledButton>
          <ReactModal
              isOpen = {this.state.showModal}
              contentLabel = "MessageFormModal"
              onRequestClose={this.handleShowModal}
              shouldCloseOnOverlayClick={true}
              appElement={root}
              className = 'Modal'
              overlayClassName = "Overlay"
          >
            <button className = "close-button" onClick = {this.handleShowModal}> X </button>
              <form className='message-form' onSubmit = {e => this.messsageSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="messageInput">Message</label>
                  <textarea type="text" className="form-control" id="messageInput" name = 'message' placeholder="Your Message" onChange= {e => this.inputChangeHandler(e)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form> 
          </ReactModal>
      </div>
    )
  }
}

const StyledButton = withStyles({
  root: {
    position:"fixed",
    zIndex: 10000,
    bottom: 40,
    background: '#f50057',
    borderRadius: '50%',
    border: 0,
    color: 'white',
    height: 50,
    boxShadow: '0 3px 5px 2px rgb(0,0,0,0)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Fab);

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => {
      dispatch(postMessage(post));
    }
  };
};

export default connect(null,mapDispatchToProps)(Modal);
