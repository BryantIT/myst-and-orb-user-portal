import React, { useState, useEffect, Fragment } from 'react';
import Loading from '../loading/Loading';
import { useHistory } from 'react-router-dom';
// Styles
import {
  Form,
  Segment,
  Label,
  Input,
  Button } from '../universal/FormStyles';
import {
  Validation,
  ValidationLabel } from '../universal/AlertStyles'
// Auth
import { useAuth } from '../../auth/UserAuth';

const Signin = () => {
  const history = useHistory()
  const { signin, currentUser } = useAuth()
  const [signinError, setSigninError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formValidationMessage, setFormValidationMessage] = useState('')
  const [renderFormMessage, setRenderFormMessage] = useState(false)
  const [isMounted, setIsMouted] = useState(true)

  useEffect(() => {
    if(currentUser) {
      history.push('/dashboard')
    }
  }, [currentUser, history])

  const handleChange = (event) => {
    const value = event.target.value
    setData({
      ...data,
      [event.target.name]: value,
    })
  }

  useEffect(() => {
    if (data) {
      setEmail(data.email)
      setPassword(data.password)
    }
  }, [data])

  const signinData = async () => {
    try {
      setSigninError('')
      setIsLoading(true)
      await signin(email, password)
    } catch {
      setSigninError(
        'There was a problem signing you in. Please use the contact form and let use know.'
      )
    }
    setIsLoading(false)
    setIsMouted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(isMounted) {
      signinData()
      history.push('/dashboard')
    }
  }

  return (
    <Fragment>
      {
        isLoading ? (
        <Loading />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Segment>
            <h1>Sign In</h1>
          </Segment>
          <Label>
            <Input
              color={'#a1a1a1'}
              name='email'
              onChange={handleChange}
              type='email'
              placeholder='Email Address'
            />
            <Input
              color={'#a1a1a1'}
              name='password'
              onChange={handleChange}
              type='password'
              placeholder='Password'
            />
          </Label>
          <Button
            disabled={isLoading}
            type='submit'
            value='submit'
            color={'#a1a1a1'}
          >
            Submit
          </Button>
          {renderFormMessage ? (
            <ValidationLabel>
              <Validation>{formValidationMessage}</Validation>
            </ValidationLabel>
          ) : null}
        </Form>
      )}
    </Fragment>
  )
}

export default Signin
