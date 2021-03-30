import React, { useState, useEffect } from 'react'
import { siteAds } from './AdsDatabse'
import {
  AdImage,
  Container} from './Styles'

const Ads = () => {
  const adCount = siteAds.length
  const [nextAdIndex, setNextAdIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setInterval(() => {
        const count = adCount
        const min = Math.ceil(0)
        const max = Math.floor(count)
        const index = Math.floor(Math.random() * (max - min) + min)
        setNextAdIndex(index)
    }, 600000)
  }, [adCount])

  console.log('Next', nextAdIndex)
  console.log('siteAds', siteAds[0].link)



  return (
    <Container>
        {
          siteAds && isMounted ? (
            <a href={siteAds[nextAdIndex].link} target='blank'>
            <AdImage src={siteAds[nextAdIndex].source} alt={siteAds[nextAdIndex].name}/></a>
          ) : null
        }
    </Container>
  )
}

export default Ads
