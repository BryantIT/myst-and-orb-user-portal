import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { states } from '../../helpers/States'
// Components
import AlreadyAUser from '../general/AlreadyAUser'
import Loading from '../loading/Loading'
import { db, storage, fieldValue, firebase, auth } from '../../firebase'
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
  ButtonsContainer,
  MultiButton,
  TeamsLabel,
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
  const [createdOn, setCreatedOn] = useState()
  const [updatedOn, setUpdatedOn] = useState()
  const [hasProfileImage, setHasProfileImage] = useState(false)
  const [teamsArray, setTeamsArray] = useState([])
  const [teams, setTeams] = useState([])
  const [displayTeams, setDisplayTeams] = useState(false)
  const [test, setTest] = useState()
  const [solo, setSolo] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState()
  const [team, setTeam] = useState()
  const [hasSecret, setHasSecret] = useState(false)
  const [secretPassed, setSecretPassed] = useState(false)

  const getTeams = async () => {
    const teamData = await db.collection('teams').get()
    .then((snapshot) => {
      let array = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id
        array.push({
          id: id,
          name: data.name
        })
      })
      setTeamsArray(array)
    })
  }

  useEffect(() => {
    setEmail(currentUser.email)
  }, [currentUser])

  console.log('EMAIL', currentUser.email)

  const handleChange = (event) => {
    const value = event.target.value
    setData({
      ...data,
      [event.target.name]: value,
    })
  }

  const handleTeamChange = (event) => {
    const value = event.target.value
    const team = teamsArray.find(t => t.id === value)
    setSelectedTeam(team)
  }

  const handleSecretChange = (event) => {
    const value = event.target.value
    if(value === team.secret) {
      setSecretPassed(true)
    }
  }

  useEffect(() => {
    const getTeam = async () => {
      await db.collection('teams').doc(selectedTeam.id).get()
      .then((snapshot) => {
        const data = snapshot.data()
        const id = snapshot.id
        setTeam({
          id: id,
          name: data.name,
          description: data.description,
          location: {
            city: data.city,
            state: data.state,
          },
          requiresSecret: data.requiresSecret,
          secret: data.secret
        })
      })
    }
    if(selectedTeam) {
      getTeam()
    }
  }, [selectedTeam])

  useEffect(() => {
    if(team) {
      setHasSecret(team.requiresSecret)
    }
  }, [team])

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

  useEffect(() => {
    if(currentUser && !currentUser.emailVerified) {
      auth.currentUser.sendEmailVerification()
      .then(() => {
        console.log('Verification Email Sent')
      })
      .catch((error) => {
        console.log('Email not sent', error)
      })
    }
  }, [currentUser])


  const userInfoFirebase = () => {
    if(teams && currentUser) {
      const userId = currentUser.uid
      console.log('USER IF', userId)
      console.log(typeof userId)
      db.collection('teams').doc(team.id).update({
        // Try shorting this
        teamMembers: firebase.firestore.FieldValue.arrayUnion(userId)
      })
    }
      db.collection('users').doc(`${currentUser.uid}`).set({
        createdOn: createdOn,
        updatedOn: createdOn,
        firstName: firstName,
        lastName : lastName,
        city: city,
        state: state,
        email: email,
        profileImageInfo: profileImageInfo,
        team: team.id,
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
    setCreatedOn()
    setUpdatedOn()
    setTeam()
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
    console.log('DATA', data)
    console.log('DATA EMAIL', email)
    console.log('DATA Image', hasProfileImage)
    console.log('DATA Created', createdOn)
    console.log('DATA Updated', updatedOn)
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
    setSolo(false)
    if(!displayTeams) {
      getTeams()
    }
    setDisplayTeams(!displayTeams)
    if(displayTeams) {
      setSelectedTeam()
    }
  }

  const handleSoloClick = () => {
    setDisplayTeams(false)
    setSolo(!solo)
  }

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
            <Segment>
              <ButtonsContainer>
                <MultiButton
                  onClick={handleTeamClick}
                  type='button'
                  value='join'
                  color={submitLine}
                >
                  Join a team
                </MultiButton>
                <MultiButton
                  onClick={handleSoloClick}
                  type='button'
                  value='solo'
                  color={submitLine}
                >
                  Go it solo
                </MultiButton>
              </ButtonsContainer>
              <TeamsLabel>
                {solo ? (
                  <ValidationLabel>
                    <Success>{`Going Solo! Don't worry you can always join or create a team later`}</Success>
                  </ValidationLabel>
                ) : null
                }
                {
                  displayTeams ?
                  <Select
                    color={stateLine}
                    name='team'
                    onChange={handleTeamChange}
                    defaultValue='Select your team'>
                    <option disabled>{
                      'Select your team'
                    }</option>
                    {
                      teamsArray.sort((a, b) =>
                    a.name.localeCompare(b.name)).map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))
                    }
                  </Select> : null
                }
              </TeamsLabel>
            </Segment>
            <Segment>
              {
                hasSecret ?
                <TeamsLabel>
                  <Input
                    color={firstNameLine}
                    name='secret'
                    onChange={handleSecretChange}
                    type='password'
                    placeholder='Team Secret'
                  />
                </TeamsLabel> : null
              }
              {
                secretPassed ? (
                <ValidationLabel>
                  <Success>{`Correct`}</Success>
                </ValidationLabel>
              ) : null
            }
            {
              !secretPassed && hasSecret ? (
              <ValidationLabel>
                <Warning>{`This team requires a code to join`}</Warning>
              </ValidationLabel>
            ) : null
          }
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
