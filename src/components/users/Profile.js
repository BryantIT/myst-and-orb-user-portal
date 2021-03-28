import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { states } from '../../helpers/States'
// Components
import CredChange from './CredChange'
import AlreadyAUser from '../general/AlreadyAUser'
import Loading from '../loading/Loading'
import { db, storage, auth } from '../../firebase'
import { DateTime } from 'luxon'
// Styles
import {
  Form,
  Segment,
  Label,
  Input,
  Select,
  Button,
  ButtonsContainer,
  MultiButton,
  ProfileImage,
  AvatarUploader,
  ChoiceContainer,
  CaptchaContainer,
  ModalContainer,
  ModalInner,
} from '../universal/FormStyles'
import {
  Info,
  Success,
  Warning,
  WarningWithAction,
  Error,
  Validation,
  ValidationLabel,
  ValidationLine,
  LineWrapper,
  AlertBoxContainer,
  AlertBoxOverlay,
  AlertBoxModal
} from '../universal/AlertStyles'
// Auth
import { useAuth } from '../../auth/UserAuth'

const SecondStep = ({ userEmail }) => {
  const { currentUser, userInfo } = useAuth()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [city, setCity] = useState()
  const [state, setState] = useState()
  const [email, setEmail] = useState()
  const [profileImageInfo, setProfileImageInfo] = useState({})
  const [formValidationMessage, setFormValidationMessage] = useState()
  const [renderFormMessage, setRenderFormMessage] = useState(false)
  const inputFile = useRef()
  const [profileImage, setProfileImage] = useState('images/avatar.png')
  const [firstNameLine, setFirstNameLine] = useState('##a1a1a1')
  const [lastNameLine, setLastNameLine] = useState('##a1a1a1')
  const [cityLine, setCityLine] = useState('##a1a1a1')
  const [stateLine, setStateLine] = useState('##a1a1a1')
  const [avatarLine, setAvatarLine] = useState('##a1a1a1')
  const [submitLine, setSubmitLine] = useState('##a1a1a1')
  const [imageAsFile, setImageAsFile] = useState()
  const [imageFileName, setImageFileName] = useState()
  const [updatedOn, setupdatedOn] = useState({})
  const [hasProfileImage, setHasProfileImage] = useState(false)
  const [oldBucket, setOldBucket] = useState()
  const [oldFileName, setOldFileName] = useState()
  const [oldInfoSet, setOldInfoSet] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentTeam, setCurrentTeam] = useState()
  const [teamPositions, setTeamPositions] = useState()
  const [displayTeamWarning, setDisplayTeamWarning] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationError, setVerificationError] = useState()
  const [displayEmailChange, setDisplayEmailChange] = useState(false)
  const [displayPasswordChange, setDisplayPasswordChange] = useState(false)

  useEffect(() => {
    if(currentUser && userInfo) {
      const teamData = db.collection('teams').doc(userInfo.team).onSnapshot((snapshot) => {
        setCurrentTeam(snapshot.data((info) => {
          return {
            id: info.id
          }
        }))
      })
      return teamData
    }
  }, [currentUser, userInfo])

  useEffect(() => {
    if(currentTeam && currentUser) {
      const x = currentTeam.positions
      const filtered = x.filter((i) => {
        return  i.members.includes(currentUser.uid)
      }).map(x => x.name)
      setTeamPositions(filtered)
    }
  }, [currentTeam, currentUser])

  useEffect(() => {
    setIsMounted(false)
    if(currentUser && userInfo) {
      const pathInfo = userInfo.profileImageInfo
      setOldBucket(pathInfo.bucket)
      setOldFileName(pathInfo.fileName)
      setIsMounted(true)
    }
    setOldInfoSet(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, currentUser])

  useEffect(() => {
    if(userInfo && oldInfoSet) {
      const pathInfo = userInfo.profileImageInfo
      const bucket = pathInfo.bucket
      const fileName = pathInfo.fileName
      const path = `${bucket}/${fileName}`
      const storageRef = storage.ref()
      const image = storageRef.child(path)

      image.getDownloadURL()
      .then((url) => {
        console.log('INSIDE DATABASE', url)
        setProfileImage(url)
        return url
      })
    }
    return
  }, [userInfo, oldInfoSet])

  const deleteOldFile = () => {
    const storageRef = storage.ref()
    const deleteRef = storageRef.child(`${oldBucket}/${oldFileName}`)
    deleteRef.delete().then(() => {
      console.log('File Deleted')
    }).catch((error) => {
      console.log('Error Deleting', error.message)
    })
  }

  useEffect(() => {
    setEmail(userEmail)
  }, [userEmail])

  const handleChange = (event) => {
    const value = event.target.value
    setData({
      ...data,
      [event.target.name]: value,
    })
  }

  const userImageFirebase = () => {
    if(imageFileName !== oldFileName) {
      const metadata = {
        contentType: 'image',
        customMetadata: {
          uploadedBy: currentUser.uid,
          usedFor: 'Profile'
        }
      }
      const bucketName = 'profileImages'
      const file = imageAsFile
      const storageRef = storage.ref()
      setProfileImageInfo({
        bucket: bucketName,
        fileName: imageFileName,
      })
      const uploadTask = storageRef.child(`${bucketName}/${imageFileName}`).put(file, metadata)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
          console.log('Upload is ' + progress + '% done')
        }
      )
    }
  }

  const userInfoFirebase = () => {
      db.collection('users').doc(`${currentUser.uid}`).update({
        updatedOn: updatedOn,
        firstName: firstName,
        lastName : lastName,
        city: city,
        state: state,
        profileImageInfo: profileImageInfo
      })
  }

  const submitFinalData = () => {
    setIsLoading(true)
    if (currentUser) {
      setIsLoading(true)
      userInfoFirebase()
      deleteOldFile()
      resetForm()
      history.push('/dashboard')
    } else {
      console.log('USER ERROR')
    }
    setIsLoading(false)
  }

  const resetForm = () => {
    setFirstName()
    setLastName()
    setCity()
    setState()
    setEmail()
    setupdatedOn({})
    setOldBucket()
    setOldFileName()
  }

  useEffect(() => {
    if (data, userInfo) {
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setCity(data.city)
      setState(data.state)
    }
  }, [data, userInfo])

  useEffect(() => {
    if(userInfo) {
      setData({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        city: userInfo.city,
        state: userInfo.state
      })
    }
  }, [userInfo])

  const isUndefined = () => {
    if (!data.firstName) {
      setFirstNameLine('red')
      setSubmitLine('red')
    }
    if (!data.lastName) {
      setLastNameLine('red')
      setSubmitLine('red')
    }
    if (!data.city) {
      setCityLine('red')
      setSubmitLine('red')
    }
    if (data.state === 'ZZ') {
      setStateLine('red')
      setSubmitLine('red')
    }

    if (!hasProfileImage) {
      setAvatarLine('red')
      setSubmitLine('red')
    }
  }

  const getDate = () => {
    const date = DateTime.now()
    const result = date.ts
    setupdatedOn(result)
  }

  useEffect(() => {
    getDate()
  }, [data])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (
      data &&
      data.firstName &&
      data.lastName &&
      data.city &&
      data.state !== 'ZZ' &&
      updatedOn
    ) {
      submitFinalData()
    } else {
      setRenderFormMessage(true)
      setFormValidationMessage('Please complete all parts of the form')
    }
    if (data) {
      isUndefined()
    }
  }

  const handleImageUpload = () => {
    inputFile.current.click()
  }

  const handleImageChange = (event) => {
    if(inputFile){
      const image = URL.createObjectURL(event.target.files[0])
      const file = event.target.files[0]
      const date = DateTime.now()
      const imageName = date + file.name
      setImageFileName(imageName)
      setProfileImage(image)
      setImageAsFile(file)
      setHasProfileImage(true)
    }
  }

  useEffect(() => {
    if(hasProfileImage) {
      userImageFirebase()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasProfileImage])

  const handleTeamClick = () => {
    setDisplayTeamWarning(!displayTeamWarning)
  }

  useEffect(() => {
    if(!currentUser.emailVerified) {
      setVerificationSent(false)
    }
  }, [currentUser])

  const handleEmailVerification = () => {
    if(currentUser && !currentUser.emailVerified) {
      auth.currentUser.sendEmailVerification()
      .then(() => {
        setVerificationSent(true)
        setVerificationError()
        console.log('Verification Email Sent')
      })
      .catch((error) => {
        setVerificationError('There was a problem with verification. Please try again later or contact site admin')
        console.log('Email not sent', error)
      })
    }
  }

  const handleChangeEmailClick = () => {
    setDisplayEmailChange(!displayEmailChange)
  }

  const handleChangePasswordClick = () => {
    setDisplayPasswordChange(!displayPasswordChange)
  }

  return (
    <Fragment>
      {
        isLoading ? (
        <Loading />
      ) :
      isMounted ?
      <Form onSubmit={handleSubmit}>
        <Segment>
          <h1>Your Profile</h1>
        </Segment>
          <Segment>
            <ProfileImage
              color={avatarLine}
              src={profileImage}
              alt='avatar'
              onClick={handleImageUpload}
            />
            <AvatarUploader
              ref={inputFile}
              onChange={handleImageChange}
              name='profileImage'
              type='file'
              accept='image/*'
              multiple={false}
            />
            {
              !currentUser.emailVerified && !verificationSent ?
                <ValidationLabel>
                  <WarningWithAction onClick={handleEmailVerification}>
                    {
                      verificationError ?
                      verificationError : 'Email not verified. Click to resend verification'
                    }
                  </WarningWithAction>
                </ValidationLabel> : null
            }
            {
              !currentUser.emailVerified && verificationSent ?
                <ValidationLabel>
                  <Success>
                    Email sent
                  </Success>
                </ValidationLabel> : null
            }
          </Segment>
          {
            currentTeam ?

            <Label onClick ={handleTeamClick}>
                <Input
                  disabled
                  color={lastNameLine}
                  name='team'
                  type='text'
                  placeholder={currentTeam.name}
                />
              <Input
                onClick={handleTeamClick}
                disabled
                color={lastNameLine}
                name="postion"
                type='text'
                placeholder={teamPositions}
              />
            </Label> : null
          }
          {
            displayTeamWarning ?
              <ValidationLabel>
                <Warning>Please contact team adim to change</Warning>
              </ValidationLabel> : null
          }
        <Label>
          <Input
            color={firstNameLine}
            name='firstName'
            onChange={handleChange}
            type='text'
            placeholder={firstName}
          />
          <Input
            color={lastNameLine}
            name="lastName"
            onChange={handleChange}
            type='text'
            placeholder={lastName}
          />
        </Label>
        <Label>
          <Input
            color={cityLine}
            name='city'
            onChange={handleChange}
            type='text'
            placeholder={city}
          />
          <Select color={stateLine} name='state' onChange={handleChange} defaultValue={state ? state : userInfo.state}>
            <option disabled>{
              state ? state : userInfo.state
            }</option>
            {states.map((state) => {
              return (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              )
            })}
          </Select>
        </Label>
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
      </Form> : null
      }
      <ButtonsContainer>
        <MultiButton
          onClick={handleChangeEmailClick}
          type='button'
          value='changeEmail'
          color={submitLine}
        >
          Change Email
        </MultiButton>
        <MultiButton
          onClick={handleChangePasswordClick}
          type='button'
          value='changePassword'
          color={submitLine}
        >
          Change Password
        </MultiButton>
      </ButtonsContainer>
      {
        displayEmailChange || displayPasswordChange ?
        <Segment>
          <CredChange />
        </Segment> : null
      }
    </Fragment>
  )
}

export default SecondStep
