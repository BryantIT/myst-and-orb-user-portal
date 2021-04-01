import React from 'react'
import { Timeline } from 'react-twitter-widgets'
import { isMobile } from 'react-device-detect'

const News = () => {
  return (
    isMobile ? (
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'OrbMyst'
        }}
        options={{
          height: '400',
          theme: 'dark'
        }}
      />
    ) :
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'OrbMyst'
      }}
      options={{
        height: '800',
        theme: 'dark'
      }}
    />
  )
}

export default News
