import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import './login-and-signup.css'
import axiosClient from '../axios-client.js';
import { useStateContext } from '../contexts/ContextProvider';
import { useState } from 'react';

function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onsubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    }
    setErrors(null);

    axiosClient.post('/register', payload).then(({ data }) => {
      setUser(data.user)
      setToken(data.token)
    })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          console.log(response.data.errors);
        }
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onsubmit}>
          <h1 className='title'> Signup for Free</h1>
          <input ref={nameRef} type="text" placeholder='Full Name' />
          {
            errors?.name && (
              <div id='validationMsg'>
                {errors.name}
              </div>
            )
          }
          <input ref={emailRef} type="email" placeholder='Email' />
          {
            errors?.email && (
              <div id='validationMsg'>
                {errors.email}
              </div>
            )
          }
          <input ref={passwordRef} type="password" placeholder='Password' />
          {
            errors?.password && (
              <div id='validationMsg'>
                {errors.password}
              </div>
            )
          }
          <input ref={confirmPasswordRef} type="password" placeholder='Confirm Password' />
          {
            errors?.confirmed_password && (
              <div id='validationMsg'>
                {errors.confirmed_password}
              </div>
            )
          }
          <button id='btn' className='btn-block'>Register</button>
        </form>
        <p className='message'>
          Already Registered? <Link to='/auth/login'>Sign In</Link>
        </p>

      </div>
    </div >
  )
}

export default Register
