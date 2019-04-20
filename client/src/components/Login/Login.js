import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

export default class Login extends Component {
  constructor(props) {
    super(props) 
    this.state = {
    formFields : {
      email: '',
      password: '',
    }, 
    authentication: false
    }
  }

  inputChangeHandler = (e) => {
    let formFields = {...this.state.formFields}; 
    formFields[e.target.name] = e.target.value.toLowerCase();
    this.setState({formFields});
  }

  loginUser = (e) => {
    e.preventDefault()
    let userData = this.state.formFields;

    axios.post('http://localhost:3001/API/users/login', userData)
      .then(res => {
        const {token} = res.data;
        localStorage.setItem('jwt', token)
      })
      .then(() => {
        this.setState(() => {
          return {
            authentication: true
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render(props) {
    if (this.state.authentication) {
      return (
        <Redirect to= '/board'/> 
      )
    }
    return (
    <div className= 'container'>
      <div className='card border-primary'>
        <div className='card-header'>
          <h2>Login</h2>
          <p>Get ready to let your ideas out</p>
        </div>
        <div className='card-body'>
          <form action="/API/users/login" method="POST" onSubmit = {e => this.loginUser(e)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name= 'email' aria-describedby="emailHelp" placeholder="Enter email" onChange= {e => this.inputChangeHandler(e)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name = 'password' placeholder="Password" onChange= {e => this.inputChangeHandler(e)}></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form> 
        </div>
        <div className='card-footer'>
          <p>Are your a new member? <a href='/users/register'>Register Here</a></p>
        </div>
      </div>
    </div>
    )
  }
}
