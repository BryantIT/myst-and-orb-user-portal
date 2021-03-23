import React, { useState, useEffect, useRef, Fragment } from 'react';
import { states } from '../../helpers/States';
import Loading from '../loading/Loading';
import { useHistory } from 'react-router-dom';
// Styles
import {
  Form,
  Segment,
  Label,
  Input,
  Select,
  Button,
  ProfileImage,
  AvatarUploader,
  ChoiceContainer,
  CaptchaContainer,
  ModalContainer,
  ModalInner,
} from '../signup/FormStyle';
import {
  Info,
  Success,
  Warning,
  Error,
  Validation,
  ValidationLabel,
  ValidationLine,
  LineWrapper,
  AlertBoxContainer,
  AlertBoxOverlay,
  AlertBoxModal
} from '../signup/MessagesStyle';
// Auth
import { useAuth } from '../../auth/UserAuth';

const Signup = () => {
  const history = useHistory()
  const { signin } = useAuth()
  const [signupError, setSigninError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formValidationMessage, setFormValidationMessage] = useState('')
  const [renderFormMessage, setRenderFormMessage] = useState(false)







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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setSigninError('')
      setIsLoading(true)
      await signin(email, password)
      .then(history.push('/dashboard'))
    } catch {
      setSigninError(
        'There was a problem signing you in. Please use the context form and let use know.'
      )
    }
    setIsLoading(false)
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

export default Signup
