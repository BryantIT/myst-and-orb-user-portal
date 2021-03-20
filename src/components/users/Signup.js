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
  const [data, setData] = useState({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailValidationMessage, setEmailValidationMessage] = useState('')
  const [renderEmailMessage, setRenderEmailMessage] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('')
  const [renderPasswordMessage, setRenderPasswordMessage] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const handleChange = (event) => {
    const value = event.target.value
    setData({
      ...data,
      [event.target.name]: value
    })
  }

  useEffect(() => {
    if(data){
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setCity(data.city)
      setState(data.state)
      setEmail(data.email)
      setConfirmEmail(data.confirmEmail)
      setPassword(data.password)
      setConfirmPassword(data.confirmPassword)
    }
  }, [data])
  console.log('First Name', firstName)
  console.log('Last Name', lastName)

  useEffect(() => {
    if(confirmEmail !== undefined && confirmEmail !== email){
      setEmailValidationMessage('Emails do not match')
      setRenderEmailMessage(true)
    }
    if(confirmEmail === undefined || confirmEmail === email){
      setRenderEmailMessage(false)
    }
    if(email !== undefined && confirmEmail === undefined){
      const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
      setEmailValidationMessage('Not a valid email')
      setRenderEmailMessage(!emailCheck)
    }
  }, [email, confirmEmail])

  useEffect(() => {
    if(confirmPassword !== undefined && confirmPassword !== password){
      setPasswordValidationMessage('Passwords do not match')
      setRenderPasswordMessage(true)
      console.log('am I here')
    }
    if(confirmPassword === undefined || confirmPassword === password){
      setRenderPasswordMessage(false)
    }
    if(password !== undefined && confirmPassword === undefined){
      const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)
      setPasswordValidationMessage('Minimum six characters, at least one uppercase letter, one lowercase letter and one number')
      setRenderPasswordMessage(!passwordCheck)
    }
  }, [password, confirmPassword])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('--------------------------')
    console.log('firstName', firstName)
    console.log('lastName', lastName)
    console.log('city', city)
    console.log('state', state)
    console.log('email', email)
    console.log('confirmEmail', confirmEmail)
    console.log('password', password)
    console.log('confirmPassword', confirmPassword)
    console.log('--------------------------')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Segment>
        <h1>Sign up</h1>
      </Segment>
      <Label>
        <Input
          name='firstName'
          onChange={handleChange}
          type="text"
          placeholder="First Name" />
        <Input
          name='lastName'
          onChange={handleChange}
          type="text"
          placeholder="Last Name" />
      </Label>
      <Label>
        <Input
          name='city'
          onChange={handleChange}
          type="text"
          placeholder="City" />
        <Select name='state' onChange={handleChange}>
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
          name='email'
          onChange={handleChange}
          type="email"
          placeholder="Email Address" />

        <Input
          name='confirmEmail'
          onChange={handleChange}
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
          name='password'
          onChange={handleChange}
          type="password"
          placeholder="Password" />
        <Input
          name='confirmPassword'
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password" />
      </Label>
      {
        renderPasswordMessage ?
        <ValidationLabel>
          <Validation>{passwordValidationMessage}</Validation>
        </ValidationLabel> : null
      }
      <Button className="red" type="submit" value='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
