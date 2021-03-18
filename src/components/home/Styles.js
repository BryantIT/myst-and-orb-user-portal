import styled from 'styled-components'

export const Main = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr;
gap: 0px 0px;
grid-template-areas:
    "UserSide Interior Interior AdSide"
    "UserSide Interior Interior AdSide"
    "UserSide Interior Interior AdSide";
width: 100%;
height: 100vh;
overflow: hidden;
background: radial-gradient(circle, rgba(55, 53, 53, 1) 0%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%);
padding-top: 4px;
`

export const UserSide = styled.div`
grid-area: UserSide;
`

export const AdSide = styled.div`
grid-area: AdSide;
`

export const Interior = styled.div`
grid-area: Interior;
`
