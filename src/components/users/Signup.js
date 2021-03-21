import React, { useState, useEffect, useRef } from "react"
import { states } from '../../helpers/States'
// Styles
import {
  Form,
  Segment,
  Label,
  Input,
  Select,
  Button,
  ProfileImage,
  AvatarUploader} from './FormStyle'
  import {
    Info,
    Success,
    Warning,
    Error,
    Validation,
    ValidationLabel,
    ValidationLine,
    LineWrapper } from './MessagesStyle'

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
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('')
  const [formValidationMessage, setFormValidationMessage] = useState('')
  const [renderEmailMessage, setRenderEmailMessage] = useState(false)
  const [renderPasswordMessage, setRenderPasswordMessage] = useState(false)
  const [renderFormMessage, setRenderFormMessage] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const inputFile = useRef()
  const [profileImage, setProfileImage] = useState('images/avatar.png')
  const [firstNameLine, setFirstNameLine] = useState('#a1a1a1')
  const [lastNameLine, setLastNameLine] = useState('#a1a1a1')
  const [cityLine, setCityLine] = useState('#a1a1a1')
  const [stateLine, setStateLine] = useState('#a1a1a1')
  const [emailLine, setEmailLine] = useState('#a1a1a1')
  const [confirmEmailLine, setConfirmEmailLine] = useState('#a1a1a1')
  const [passwordLine, setPasswordLine] = useState('#a1a1a1')
  const [confirmPasswordLine, setConfirmPasswordLine] = useState('#a1a1a1')
  const [avatarLine, setAvatarLine] = useState('#a1a1a1')
  const [submitLine, setSubmitLine] = useState('#a1a1a1')

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

  const isUndefined = () => {
    if(!data.firstName) {
      setFirstNameLine('red')
      setSubmitLine('red')
    }
    if(!data.lastName) {
      setLastNameLine('red')
      setSubmitLine('red')
    }
    if(!data.city) {
      setCityLine('red')
      setSubmitLine('red')
    }
    if(data.state === 'ZZ') {
      setStateLine('red')
      setSubmitLine('red')
    }
    if(!data.email) {
      setEmailLine('red')
      setSubmitLine('red')
    }
    if(!data.confirmEmail) {
      setConfirmEmailLine('red')
      setSubmitLine('red')
    }
    if(!data.password) {
      setPasswordLine('red')
      setSubmitLine('red')
    }
    if(!data.confirmPassword) {
      setConfirmPasswordLine('red')
      setSubmitLine('red')
    }
    if(data.profileImage === 'images/avatar.png' || !data.profileImage) {
      setAvatarLine('red')
      setSubmitLine('red')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(data && data.firstName && data.lastName && data.city && data.state !== 'ZZ' && data.email && data.confirmEmail && data.password && data.confirmPassword && data.profileImage === 'images/avatar.png'){
      setRenderFormMessage(false)
    } else {
      setRenderFormMessage(true)
      setFormValidationMessage('Please complete all parts of the form')
    }
    if(data) {
      isUndefined()
    }
  }

  const handleImageUpload = () => {
    console.log('Image upload works')
    inputFile.current.click()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Segment>
        <h1>Sign up</h1>
      </Segment>
      <Segment>
          <ProfileImage
            color={avatarLine}
            src={profileImage}
            alt='avatar'
            onClick={handleImageUpload} />
          <AvatarUploader
            ref={inputFile}
            onChange={handleChange}
            name='profileImage'
            type='file'
            accept='image/*'
            multiple='false' />
      </Segment>
      <Label>
        <Input
          color={firstNameLine}
          name='firstName'
          onChange={handleChange}
          type="text"
          placeholder="First Name" />
        <Input
          color={firstNameLine}
          name='lastName'
          onChange={handleChange}
          type="text"
          placeholder="Last Name" />
      </Label>
      <Label>
        <Input
          color={firstNameLine}
          name='city'
          onChange={handleChange}
          type="text"
          placeholder="City" />
        <Select
          color={firstNameLine}
          name='state'
          onChange={handleChange}>
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
          color={firstNameLine}
          name='email'
          onChange={handleChange}
          type="email"
          placeholder="Email Address" />

        <Input
          color={firstNameLine}
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
          color={firstNameLine}
          name='password'
          onChange={handleChange}
          type="password"
          placeholder="Password" />
        <Input
          color={firstNameLine}
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
      <Button className="red" type="submit" value='submit' color={submitLine}>
        Submit
      </Button>
      {
        renderFormMessage ?
        <ValidationLabel>
          <Validation>{formValidationMessage}</Validation>
        </ValidationLabel> : null
      }
    </Form>
  );
};

export default Signup;
