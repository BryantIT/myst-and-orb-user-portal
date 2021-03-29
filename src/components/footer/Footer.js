import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
// Styles
import {
  Main,
  CopyWrite,
  FooterInfo,
  Social} from './Styles'

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
        Hello Social
      </Social>
    </Main>
  )
}

export default Footer
