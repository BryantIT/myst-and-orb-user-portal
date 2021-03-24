import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  width: 80%;
`

export const HeaderContainer = styled.div`
  text-align: center;
  padding-bottom: 10px;
  font-size: 50px;
`

export const InnerContainer = styled.div`
  padding-top: 12px;
  font-size: 20px;
`

export const Divider = styled.div`
  position: relative;
  margin-top: 5px;
  height: 1px;
  padding: 6px;
  &:before {
    content: "";
	  position: absolute;
	  top: 0;
	  left: 5%;
	  right: 5%;
	  width: 90%;
	  height: 10px;
	  background-image: linear-gradient(to right, transparent, #a1a1a1, transparent);
  }
`
