import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth/UserAuth'
// Database
import { userProfileImage } from '../../database/Database'
import { auth, db, storage } from '../../firebase'
// Styles
import {
  Segment,
  ProfileImage } from './Styles'

const UserProfileMini = () =>{
  const { currentUser, userInfo } = useAuth()
  const [imageURL, setImageURL] = useState()
  const [gettingUrl, setGettingUrl] = useState(false)

  console.log('USER INFO', userInfo)
  console.log(currentUser)
  console.log('IMAGE', imageURL)

  console.log('>>>>>>>>>>>>>><<<<<<<<<<<<<<<', gettingUrl)


  useEffect(() => {
    if(userInfo) {
      const pathInfo = userInfo.profileImageInfo
      const bucket = pathInfo.bucket
      const fileName = pathInfo.fileName
      const path = `${bucket}/${fileName}`
      const storageRef = storage.ref()
      const image = storageRef.child(path)

      image.getDownloadURL()
      .then((url) => {
        console.log('INSIDE DATABASE', url)
        setImageURL(url)
        return url
      })
    }
    return
  }, [userInfo])

  return (
    <Segment>
      <ProfileImage
        src={imageURL}
        alt='avatar'
      />
    </Segment>
  )
}

export default UserProfileMini
