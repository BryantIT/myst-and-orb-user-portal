import React, { useState, useEffect, Fragment } from 'react'
import { useAuth } from '../../auth/UserAuth'
import { DateTime, Interval } from 'luxon'
import { auth, db, storage } from '../../firebase'
// Styles
import {
  SegmentMini,
  ProfileImage} from './Styles'
import {
  Divider,
  InnerContainer,
  MiniDivider,
  Break} from '../universal/Styles'

const UserProfileMini = () =>{
  const { currentUser, userInfo } = useAuth()
  const [imageURL, setImageURL] = useState()
  const [gettingUrl, setGettingUrl] = useState(false)
  const [memberSince, setMemberSince] = useState({})

  console.log(memberSince)

  useEffect(() => {
    if(userInfo) {
      const start = userInfo.createdOn
      const startConverted = DateTime.fromMillis(start)
      const now = DateTime.now()
      const calculate = now.diff(startConverted, ['years', 'months', 'days'])
      const result = {
        years: calculate.years.toFixed(),
        months: calculate.months.toFixed(),
        days: calculate.days.toFixed()
      }
      setMemberSince(result)
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

  const ProfileMini = () => {
    return (
      <Fragment>
        <SegmentMini>
          <ProfileImage
            src={imageURL}
            alt='avatar'
          />
          <Divider />
        </SegmentMini>
        <SegmentMini>
          Member For:
          <Break />
          <Break />
            {
              `Years: ${memberSince.years}`
            }
            <Break />
            {
              `Months: ${memberSince.months}`
            }
            <Break />
            {
              `Days: ${memberSince.days}`
            }
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          Investigations:
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          Team Member Of:
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          Badges:
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          Edit Profile
        </SegmentMini>
      </Fragment>
    )
  }

  const NoUserProfileMini = () => {
    return (
      <SegmentMini>
        <ProfileImage
          src='images/logo.png'
          alt='avatar'
        />
      </SegmentMini>
    )
  }

  return (
    currentUser && userInfo ? (
      <ProfileMini />
    ) :
    <NoUserProfileMini />
  )
}

export default UserProfileMini
