import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import './Register.css';

 class Register extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      formFields : {
        name: '',
        email: '', 
        password: '', 
        password2: ''
      },
      registered: false
    }
  }

  inputChangeHandler = (e) => {
    let formFields = {...this.state.formFields}; 
    formFields[e.target.name] = e.target.value;
    this.setState({formFields});
  }

   onSubmitform = (e) => {
    e.preventDefault();
    let userData = this.state.formFields;

    axios.post('http://localhost:3001/API/users/register', userData)
    .then(res => console.log(res.data))
    .then(() => { 
      this.setState({registered: true})
    })
    .catch(err => console.log(err))

    this.setState.formFields = {
      name: '',
      email: '', 
      password: '', 
      password2: ''
    }
  }

  render() {
    if (this.state.registered) {
      return (
        <Redirect to= '/'/> 
      )
    }
    return (
      <div className='container'>
        <div id="register-form">
          <div className='card text-dark border-primary mb-3'>
            <div className='card-header'>
              <h2>Register</h2>
              <p className="hint-text">Create your account. It's free and only takes a minute.</p>
            </div>
            <div className='card-body'>
              <form action="/API/users/register" method="POST" onSubmit = {e => this.onSubmitform(e)}>
                <div className="form-group">
                  <div className="col-xs-6"><input type="text" className="form-control" name="name" placeholder="Your Name" required="required" onChange= {e => this.inputChangeHandler(e)}/></div>   	
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" name="email" placeholder="Email" required="required"  onChange= {e => this.inputChangeHandler(e)}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" name="password" placeholder="Password" required="required" aria-autocomplete="list"  onChange= {e => this.inputChangeHandler(e)}/>
                </div>
                  <div className="form-group">
                    <input type="password" className="form-control" name="password2" placeholder="Confirm Password" required="required"  onChange= {e => this.inputChangeHandler(e)}/>
                </div>  
                <br/>       
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Register Now</button>
                </div>
              </form>
            </div>
            <div className='card-footer'>
              <div className="text-center">Already have an account? <a href="/users/login">Sign in</a> </div>          
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;