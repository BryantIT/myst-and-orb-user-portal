import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { states } from '../../helpers/States'
// Components
import AlreadyAUser from '../general/AlreadyAUser'
import Loading from '../loading/Loading'
import { db, storage } from '../../firebase'
import { DateTime } from 'luxon'
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
} from './FormStyle'
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
  const [createdOn, setCreatedOn] = useState({})
  const [hasProfileImage, setHasProfileImage] = useState(false)

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
    console.log('StorageRef', storageRef)
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

  const userInfoFirebase = () => {
      db.collection('users').doc(`${currentUser.uid}`).set({
        createOn: createdOn,
        firstName: firstName,
        lastName : lastName,
        city: city,
        state: state,
        email: email,
        profileImageInfo: profileImageInfo,
        isPaid: 'no',
        inGoodStanding: 'yes'
      })
  }

  const submitFinalData = () => {
    setIsLoading(true)
    if (currentUser) {
      setIsLoading(true)
      userInfoFirebase()
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
    setProfileImage('images/avatar.png')
    setCreatedOn({})
  }

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setCity(data.city)
      setState(data.state)
    }
  }, [data])

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
    const dateAsObject = {
      year: date.year,
      month: date.month,
      day: date.day,
      hour: date.hour,
      minute: date.minute
    }
    const converted = DateTime.fromObject(dateAsObject)
    const result = (converted)/1000
    setCreatedOn(result)
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
      email &&
      hasProfileImage &&
      createdOn
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

  return (
    <Fragment>
      {
        isLoading ? (
        <Loading />
      ) :
        <Form onSubmit={handleSubmit}>
          <Segment>
            <h1>Profile Info</h1>
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
            </Segment>
          <Label>
            <Input
              color={firstNameLine}
              name='firstName'
              onChange={handleChange}
              type='text'
              placeholder='First Name'
            />
            <Input
              color={lastNameLine}
              name="lastName"
              onChange={handleChange}
              type='text'
              placeholder='Last Name'
            />
          </Label>
          <Label>
            <Input
              color={cityLine}
              name='city'
              onChange={handleChange}
              type='text'
              placeholder='City'
            />
            <Select color={stateLine} name='state' onChange={handleChange}>
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
        </Form>
      }
    </Fragment>
  )
}

export default SecondStep
