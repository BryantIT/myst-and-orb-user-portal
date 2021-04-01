import React, { Fragment } from 'react'
import {
Divider,
MiniDivider,
NavLink } from '../universal/Styles'
import {
  SegmentMini,
  LinkWrapper} from './Styles'

const Tools = () => {
  return (
      <Fragment>
        <SegmentMini>
          Reports
        </SegmentMini>
        <SegmentMini>
          <Divider />
        </SegmentMini>
        <SegmentMini>
          Total Reports:
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          Total EVPs:
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          Total Images:
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          Total Videos:
        </SegmentMini>
        <MiniDivider />
        <SegmentMini>
          <LinkWrapper>
            <NavLink to='/reports'>New Report</NavLink>
          </LinkWrapper>
        </SegmentMini>
      </Fragment>
  )
}

export default Tools
