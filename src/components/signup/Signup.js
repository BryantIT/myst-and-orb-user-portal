import React, { useState, useEffect, Fragment } from 'react'
import Loading from '../loading/Loading'
import SecondStep from './SecondStep'
// Styles
import {
  Form,
  Segment,
  Label,
  Input,
  Button,
} from './FormStyle'
import {
  Validation,
  ValidationLabel,
} from './MessagesStyle'
// Auth
import { useAuth } from '../../auth/UserAuth'

const Signup = () => {
  const { signup, currentUser } = useAuth()
  const [signupError, setSignupError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [email, setEmail] = useState()
  const [confirmEmail, setConfirmEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [emailValidationMessage, setEmailValidationMessage] = useState()
  const [passwordValidationMessage, setPasswordValidationMessage] = useState()
  const [formValidationMessage, setFormValidationMessage] = useState()
  const [renderEmailMessage, setRenderEmailMessage] = useState(false)
  const [renderPasswordMessage, setRenderPasswordMessage] = useState(false)
  const [renderFormMessage, setRenderFormMessage] = useState(false)
  const [emailLine, setEmailLine] = useState('##a1a1a1')
  const [confirmEmailLine, setConfirmEmailLine] = useState('##a1a1a1')
  const [passwordLine, setPasswordLine] = useState('##a1a1a1')
  const [confirmPasswordLine, setConfirmPasswordLine] = useState('##a1a1a1')
  const [submitLine, setSubmitLine] = useState('##a1a1a1')
  const [renderSecondStep, setRenderSecondStep] = useState(false)

  const handleChange = (event) => {
    const value = event.target.value
    setData({
      ...data,
      [event.target.name]: value,
    })
  }

  const createFirebaseUser = async () => {
    setIsLoading(true)
    try {
      setSignupError('')
      setIsLoading(true)
      await signup(email, password)
      .then(console.log('Setting User'))
    } catch(error){
      const message = error.message
      setSignupError(message)
    }
    setIsLoading(false)
    setRenderSecondStep(true)
  }

  useEffect(() => {
    if (data) {
      setEmail(data.email)
      setConfirmEmail(data.confirmEmail)
      setPassword(data.password)
      setConfirmPassword(data.confirmPassword)
    }
  }, [data])

  useEffect(() => {
    if (confirmEmail !== undefined && confirmEmail !== email) {
      setEmailValidationMessage('Emails do not match')
      setRenderEmailMessage(true)
    }
    if (confirmEmail === undefined || confirmEmail === email) {
      setRenderEmailMessage(false)
    }
    if (email !== undefined && confirmEmail === undefined) {
      const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
      setEmailValidationMessage('Invalid Email')
      setRenderEmailMessage(!emailCheck)
    }
  }, [email, confirmEmail])

  useEffect(() => {
    if (confirmPassword !== undefined && confirmPassword !== password) {
      setPasswordValidationMessage('Passwords do not match')
      setRenderPasswordMessage(true)
    }
    if (confirmPassword === undefined || confirmPassword === password) {
      setRenderPasswordMessage(false)
    }
    if (password !== undefined && confirmPassword === undefined) {
      const passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        password
      )
      setPasswordValidationMessage(
        'Minimum six characters, at least one uppercase letter, one lowercase letter, one special character and one number'
      )
      setRenderPasswordMessage(!passwordCheck)
    }
  }, [password, confirmPassword])

  const isUndefined = () => {
    if (!data.email) {
      setEmailLine('red')
      setSubmitLine('red')
    }
    if (!data.confirmEmail) {
      setConfirmEmailLine('red')
      setSubmitLine('red')
    }
    if (!data.password) {
      setPasswordLine('red')
      setSubmitLine('red')
    }
    if (!data.confirmPassword) {
      setConfirmPasswordLine('red')
      setSubmitLine('red')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      data.email &&
      data.confirmEmail &&
      data.password &&
      data.confirmPassword
    ) {
      setRenderFormMessage(false)
      createFirebaseUser()
      setPassword()
      setConfirmPassword()

    } else {
      setRenderFormMessage(true)
      setFormValidationMessage('Please complete all parts of the form')
    }
    if (data) {
      isUndefined()
    }
  }

  return (
    !renderSecondStep ?
    <Fragment>
      {
        isLoading ? (
        <Loading />
      ) :
        <Form onSubmit={handleSubmit}>
          <Segment>
            <h1>User Sign up</h1>
          </Segment>
          <Label>
            <Input
              color={emailLine}
              name='email'
              onChange={handleChange}
              type='email'
              placeholder='Email Address'
            />

            <Input
              color={confirmEmailLine}
              name='confirmEmail'
              onChange={handleChange}
              type='email'
              placeholder='Confirm Email Address'
            />
          </Label>
          {renderEmailMessage ? (
            <ValidationLabel>
              <Validation>{emailValidationMessage}</Validation>
            </ValidationLabel>
          ) : null}
          {signupError ? (
            <ValidationLabel>
              <Validation>{signupError}</Validation>
            </ValidationLabel>
          ) : null}
          <Label>
            <Input
              color={passwordLine}
              name='password'
              onChange={handleChange}
              type='password'
              placeholder='Password'
            />
            <Input
              color={confirmPasswordLine}
              name="confirmPassword"
              onChange={handleChange}
              type='password'
              placeholder='Confirm Password'
            />
          </Label>
          {renderPasswordMessage ? (
            <ValidationLabel>
              <Validation>{passwordValidationMessage}</Validation>
            </ValidationLabel>
          ) : null}
          <Segment></Segment>
          <Button
            disabled={isLoading}
            type='submit'
            value='submit'
            color={submitLine}
          >
            Submit
          </Button>
          {renderFormMessage ? (
            <ValidationLabel>
              <Validation>{formValidationMessage}</Validation>
            </ValidationLabel>
          ) : null}
        </Form>
      }
    </Fragment> : <SecondStep userEmail={email} />
  )
}

export default Signup
