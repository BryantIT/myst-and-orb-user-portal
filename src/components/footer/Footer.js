import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { useHistory } from 'react-router-dom'
// Styles
import {
  Main,
  CopyWrite,
  FooterInfo,
  Social,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  LinkWrapper,
  SocialWrapper,
  Symbol} from './Styles'

const Footer = () => {
  const history = useHistory()
  const [currentYear, setCurrentYear] = useState('')

  useEffect(() => {
    const now = DateTime.now()
    const year = now.year
    setCurrentYear(year)
  }, [])

  const handleSpecialClick = () => {
    history.push('/saved')
  }

  return (
    <Main>
      <CopyWrite>
        {
          currentYear + ' © TheCodeNinja'
        }
      </CopyWrite>
      <FooterInfo onClick={handleSpecialClick}>
        Manes daemones spirituum, O mi.
      </FooterInfo>
      <Social>
        <SocialWrapper>
          <LinkWrapper href='https://www.facebook.com/Myst-and-Orb-Society-100944138757824' target='blank'>
            <Facebook />
          </LinkWrapper>
          <LinkWrapper href='https://twitter.com/OrbMyst' target='blank'>
            <Twitter />
          </LinkWrapper>
          <LinkWrapper href='https://www.instagram.com/mystandorb/' target='blank'>
            <Instagram />
          </LinkWrapper>
          {/* Setup Youtube Account */}
          {/* <LinkWrapper href='' target='blank'>
            <Youtube />
          </LinkWrapper> */}
        </SocialWrapper>
      </Social>
    </Main>
  )
}

export default Footer
