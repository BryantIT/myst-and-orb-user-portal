import React, { useState, useEffect } from "react"
import { states } from '../../helpers/States'
// Styles
import {
  Form,
  Segment,
  Label,
  Input,
  Select,
  Button } from './FormStyle'
  import {
    Info,
    Success,
    Warning,
    Error,
    Validation,
    ValidationLabel } from './MessagesStyle'
import './messages.css'

const Signup = () => {
  // Email State
  const [email, setEmail] = useState('')
  const [confirmedEmail, setConfirmedEmail] = useState('')
  const [emailValidationMessage, setEmailValidationMessage] = useState('')
  const [renderEmailMessage, setRenderEmailMessage] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  // Password State
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('')
  const [renderPasswordMessage, setRenderPasswordMessage] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  console.log('password', password)
  console.log('Confirmed Password', confirmedPassword)
  console.log('passwordValidationMessage', passwordValidationMessage)
  console.log('render', renderPasswordMessage)

  // Email Functions
  const handleEmailChange = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  const handleEmailConfirmChange = (event) => {
    const value = event.target.value
    setConfirmedEmail(value)
  }

  useEffect(() => {
    if(confirmedEmail !== '' && confirmedEmail !== email){
      setEmailValidationMessage('Emails do not match')
      setRenderEmailMessage(true)
    }
    if(confirmedEmail === '' || confirmedEmail === email){
      setRenderEmailMessage(false)
    }
    if(email !== '' && confirmedEmail === ''){
      const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
      setEmailValidationMessage('Not a valid email')
      setRenderEmailMessage(!emailCheck)
    }
  }, [email, confirmedEmail])

  // Password Functions
  const handlePasswordChange = (event) => {
    const value = event.target.value
    setPassword(value)
  }

  const handlePasswordConfirmChange = (event) => {
    const value = event.target.value
    setConfirmedPassword(value)
  }

  useEffect(() => {
    if(confirmedPassword !== '' && confirmedPassword !== password){
      setPasswordValidationMessage('Passwords do not match')
      setRenderPasswordMessage(true)
      console.log('am I here')
    }
    if(confirmedPassword === '' || confirmedPassword === password){
      setRenderPasswordMessage(false)
    }
    if(password !== '' && confirmedPassword === ''){
      const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)
      setPasswordValidationMessage('Minimum six characters, at least one uppercase letter, one lowercase letter and one number')
      setRenderPasswordMessage(!passwordCheck)
    }
  }, [password, confirmedPassword])

  console.log('Password', renderPasswordMessage)



  return (
    <Form>
      <Segment>
        <h1>Sign up</h1>
      </Segment>
      <Label>
        <Input type="text" placeholder="First Name" />
        <Input type="text" placeholder="Last Name" />
      </Label>
      <Label>
        <Input type="text" placeholder="City" />
        <Select>
          {
            states.map( state => {
              return (
                <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
              )
            })
          }
        </Select>
      </Label>
      <Label>
        <Input
          onChange={handleEmailChange}
          type="email"
          placeholder="Email Address" />
        <Input
          onChange={handleEmailConfirmChange}
          type="email"
          placeholder="Confirm Email Address"
          />
      </Label>
      {
        renderEmailMessage ?
        <ValidationLabel>
          <Validation>{emailValidationMessage}</Validation>
        </ValidationLabel> : null
      }
      <Label>
        <Input
          onChange={handlePasswordChange}
          type="password"
          placeholder="Password" />
        <Input
          onChange={handlePasswordConfirmChange}
          type="password"
          placeholder="Confirm Password" />
      </Label>
      {
        renderPasswordMessage ?
        <ValidationLabel>
          <Validation>{passwordValidationMessage}</Validation>
        </ValidationLabel> : null
      }
      <Button className="red" type="button">
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
