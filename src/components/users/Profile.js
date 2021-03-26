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
} from '../universal/FormStyles'
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
  const [oldBucket, setOldBucket] = useState()
  const [oldFileName, setOldFileName] = useState()
  const [oldInfoSet, setOldInfoSet] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentTeam, setCurrentTeam] = useState()
  const [teamPositions, setTeamPositions] = useState()
  const [displayTeamWarning, setDisplayTeamWarning] = useState(false)

  useEffect(() => {
    if(currentUser && userInfo) {
      const teamData = db.collection('teams').doc(userInfo.team.uid).onSnapshot((snapshot) => {
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
        createdOn: createdOn,
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
    setCreatedOn({})
    setOldBucket()
    setOldFileName()
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
    const result = date.ts
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

  const handleTeamClick = () => {
    setDisplayTeamWarning(!displayTeamWarning)
  }

  console.log('Display', displayTeamWarning)

  const TheForm = () => {
    return(
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
            placeholder={userInfo.firstName}
          />
          <Input
            color={lastNameLine}
            name="lastName"
            onChange={handleChange}
            type='text'
            placeholder={userInfo.lastName}
          />
        </Label>
        <Label>
          <Input
            color={cityLine}
            name='city'
            onChange={handleChange}
            type='text'
            placeholder={userInfo.city}
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
    )
  }

  return (
    <Fragment>
      {
        isLoading ? (
        <Loading />
      ) :
        <TheForm />
      }
    </Fragment>
  )
}

export default SecondStep
