import React, { useRef, useState } from 'react'

import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

function login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,

    }
    setErrors(null);
    axiosClient.post('/login', payload).then(({ data }) => {
      setUser(data.user)
      setToken(data.token)
    })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {

            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
          console.log(response.data.errors);
        }
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className="title">Login into your account</h1>
        <form onSubmit={onSubmit}>
          {
            errors && <div id='alert' className='alert'>
              Invalid Email Or Password
            </div>
          }
          <input ref={emailRef} type="email" name="" placeholder='Email' />
          <input ref={passwordRef} type="password" name="" placeholder='Password' />
          <button id='btn' className='btn-block'>Login</button>
          <p className='message'>
            Not Registered? <Link to='/auth/register'>Create an account</Link>
          </p>
        </form>

      </div>
    </div>
  )
}

export default login
