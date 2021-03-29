import React, { useState, useEffect, Fragment } from 'react'
import Loading from '../loading/Loading'
import { firebase } from '../../firebase'
import { useHistory } from 'react-router-dom'
// Styles
import {
  Form,
  Segment,
  Label,
  Input,
  Button,
} from '../universal/FormStyles'
import {
  Success,
  Validation,
  ValidationLabel,
} from '../universal/AlertStyles'
// Auth
import { useAuth } from '../../auth/UserAuth'

const CredChange = ({ displayPasswordForm, displayEmailForm }) => {
  const auth = useAuth()
  const { currentUser } = useAuth()
  const [signupError, setSignupError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [oldEmail, setOldEmail] = useState()
  const [newEmail, setNewEmail] = useState()
  const [confirmEmail, setConfirmEmail] = useState()
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
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
  const [shouldDisplayEmail, setShouldDisplayEmail] = useState()
  const [shouldDisplayPassword, setShouldDisplayPassword] = useState()
  const [updateEmailSuccess, setUpdateEmailSuccess] = useState(false)
  const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false)


  useEffect(() => {
    setShouldDisplayEmail(displayEmailForm)
    setShouldDisplayPassword(displayPasswordForm)
  }, [displayEmailForm, displayPasswordForm])

  const handleChange = (event) => {
    const value = event.target.value
    setData({
      ...data,
      [event.target.name]: value,
    })
  }

  useEffect(() => {
    if (data) {
      setNewEmail(data.newEmail)
      setConfirmEmail(data.confirmEmail)
      setOldPassword(data.oldPassword)
      setNewPassword(data.newPassword)
      setConfirmPassword(data.confirmPassword)
    }
  }, [data])

  useEffect(() => {
    if (confirmEmail !== undefined && confirmEmail !== newEmail) {
      setEmailValidationMessage('Emails do not match')
      setRenderEmailMessage(true)
    }
    if (confirmEmail === undefined || confirmEmail === newEmail) {
      setRenderEmailMessage(false)
    }
    if (newEmail !== undefined && confirmEmail === undefined) {
      const newEmailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        newEmail
      )
      setEmailValidationMessage('Invalid Email')
      setRenderEmailMessage(!newEmailCheck)
    }
  }, [newEmail, confirmEmail])

  useEffect(() => {
    if (confirmPassword !== undefined && confirmPassword !== newPassword) {
      setPasswordValidationMessage('Passwords do not match')
      setRenderPasswordMessage(true)
    }
    if (confirmPassword === undefined || confirmPassword === newPassword) {
      setRenderPasswordMessage(false)
    }
    if (newPassword !== undefined && confirmPassword === undefined) {
      const newPasswordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        newPassword
      )
      setPasswordValidationMessage(
        'Minimum six characters, at least one uppercase letter, one lowercase letter, one special character and one number'
      )
      setRenderPasswordMessage(!newPasswordCheck)
    }
  }, [newPassword, confirmPassword])

  const isUndefined = () => {
    if (!data.newEmail) {
      setEmailLine('red')
      setSubmitLine('red')
    }
    if (!data.confirmEmail) {
      setConfirmEmailLine('red')
      setSubmitLine('red')
    }
    if (!data.newPassword) {
      setPasswordLine('red')
      setSubmitLine('red')
    }
    if (!data.confirmPassword) {
      setConfirmPasswordLine('red')
      setSubmitLine('red')
    }
  }

  const reAuthEmail = () => {
    if(currentUser && newEmail) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        oldPassword
      )
      const user = auth.currentUser
      user.reauthenticateWithCredential(credential)
      .then(
        user.updateEmail(newEmail)
        .then(() => {
          setUpdateEmailSuccess(true)
          setShouldDisplayEmail(false)
          console.log('New Email Updated')
        }).catch((error) => {
          console.log('Error', error)
        }).catch((error) => {
          console.log('Error', error)
        })
      )
    }
  }

  const reAuthPassword = async () => {
    if(currentUser) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        oldPassword
      )
      const user = auth.currentUser
      user.reauthenticateWithCredential(credential)
      .then(
        user.updatePassword(newPassword)
        .then(() => {
          setUpdatePasswordSuccess(true)
          setShouldDisplayPassword(false)
          console.log('New Password Updated')
        }).catch((error) => {
          console.log('Error', error)
      }).catch((error) => {
        console.log('Error', error)
        })
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newEmail && confirmEmail) {
      setRenderFormMessage(false)
      reAuthEmail()
      setOldEmail()
      setNewEmail()
      setConfirmEmail()
    }
    if (newPassword && confirmPassword) {
      setRenderFormMessage(false)
      reAuthPassword()
      setOldPassword()
      setNewPassword()
      setConfirmPassword()
    }
    if (data) {
      isUndefined()
    }
  }

  return (
    <Fragment>
      {
        isLoading ? (
        <Loading />
      ) :
        <Form onSubmit={handleSubmit}>
        {
          updateEmailSuccess ? (
            <ValidationLabel>
              <Success>Email updated successfully. Please signout and sign back in for the change to take affect.</Success>
            </ValidationLabel>
          ) : null
        }
        {
          updatePasswordSuccess ? (
            <ValidationLabel>
              <Success>Password updated successfully. Please signout and sign back in for the change to take affect.</Success>
            </ValidationLabel>
          ) : null
        }
          {
            shouldDisplayEmail ? (
              <Segment>
                <h1>Update Email</h1>
              </Segment>
            ) : null
          }
          {
            shouldDisplayPassword ? (
              <Segment>
                <h1>Update Password</h1>
              </Segment>
            ) : null
          }
          {
            shouldDisplayEmail ? (
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
            ) : null
          }
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
          {
            shouldDisplayPassword ? (
              <Fragment>
                <Label>
                  <Input
                    color={passwordLine}
                    name='oldPassword'
                    onChange={handleChange}
                    type='password'
                    placeholder='Old Password'
                  />
                </Label>
                <Label>
                  <Input
                    color={passwordLine}
                    name='newPassword'
                    onChange={handleChange}
                    type='password'
                    placeholder='New Password'
                  />
                  <Input
                    color={confirmPasswordLine}
                    name="confirmPassword"
                    onChange={handleChange}
                    type='password'
                    placeholder='Confirm New Password'
                  />
                </Label>
              </Fragment>
              ) : null
          }
          {renderPasswordMessage ? (
            <ValidationLabel>
              <Validation>{passwordValidationMessage}</Validation>
            </ValidationLabel>
          ) : null}
          <Segment></Segment>
          {
            shouldDisplayEmail || shouldDisplayPassword ? (
              <Button
                disabled={isLoading}
                type='submit'
                value='submit'
                color={submitLine}
              >
                Submit
              </Button>
            ) : null
          }
          {renderFormMessage ? (
            <ValidationLabel>
              <Validation>{formValidationMessage}</Validation>
            </ValidationLabel>
          ) : null}
        </Form>
      }
    </Fragment>
  )
}

export default CredChange
