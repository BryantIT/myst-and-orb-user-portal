import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { FaFacebook } from 'react-icons/fa'
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
  SocialWrapper } from './Styles'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState('')

  useEffect(() => {
    const now = DateTime.now()
    const year = now.year
    setCurrentYear(year)
  }, [])

  return (
    <Main>
      <CopyWrite>
        {
          currentYear + ' © TheCodeNinja'
        }
      </CopyWrite>
      <FooterInfo>
        Hello FooterInfo
      </FooterInfo>
      <Social>
        <SocialWrapper>
          <LinkWrapper>
            <Facebook />
          </LinkWrapper>
          <LinkWrapper>
            <Twitter />
          </LinkWrapper>
          <LinkWrapper>
            <Instagram />
          </LinkWrapper>
          <LinkWrapper>
            <Youtube />
          </LinkWrapper>
        </SocialWrapper>
      </Social>
    </Main>
  )
}

export default Footer
