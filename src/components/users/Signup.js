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
    if(email !== ''){
      const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
      setEmailValidationMessage('Not a valid email')
      setRenderEmailMessage(!emailCheck)
    }
  }, [email, confirmedEmail])



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
          placeholder="Confirm Email Address" />
      </Label>
      {
        renderEmailMessage ?
        <ValidationLabel className='validation-label'>
          <Validation>{emailValidationMessage}</Validation>
        </ValidationLabel> : null
      }
      <Label>
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </Label>
      <Button className="red" type="button">
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
