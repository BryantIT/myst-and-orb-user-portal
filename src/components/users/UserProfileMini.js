import React, { useState, useEffect, Fragment } from 'react'
import { useAuth } from '../../auth/UserAuth'
import { db } from '../../firebase'
import { DateTime } from 'luxon'
import { storage } from '../../firebase'
// Styles
import {
  SegmentMini,
  ProfileImage,
  LinkWrapper} from './Styles'
import {
  Divider,
  MiniDivider,
  Break,
  NavLink} from '../universal/Styles'

const UserProfileMini = () =>{
  const { currentUser, userInfo } = useAuth()
  const [imageURL, setImageURL] = useState()
  const [memberSince, setMemberSince] = useState({})
  const [userTeamID, setUserTeamID] = useState()
  const [teamName, setTeamName] = useState()

  useEffect(() => {
    if(userInfo) {
      setUserTeamID(userInfo.team)
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

  useEffect(() => {
    if(userTeamID){
      const getTeam = async () => {
        await db.collection('teams').doc(userTeamID).get()
        .then((snapshot) => {
          const data = snapshot.data()
          setTeamName(data.name)
        })
      }
      return getTeam()
    }
  }, [userTeamID])

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
          <Break />
          <Break />
          {
            teamName
          }
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          Badges:
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          <LinkWrapper>
            <NavLink to='/profile'>Edit Profile</NavLink>
          </LinkWrapper>
        </SegmentMini>
      </Fragment>
    )
  }

  const NoUserProfileMini = () => {
    return (
      <Fragment>
        <SegmentMini>
          <ProfileImage
            src='images/logo.png'
            alt='avatar'
          />
        </SegmentMini>
        <SegmentMini>
          <LinkWrapper>
            <NavLink to='/signup'>Join us Here!</NavLink>
          </LinkWrapper>
        </SegmentMini>
      </Fragment>
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
