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
padding: 6px;
`

export const UserSide = styled.div`
grid-area: UserSide;
border: 1px groove #a1a1a1;
border-radius: 5px;
padding: 6px;
`

export const AdSide = styled.div`
grid-area: AdSide;
border: 1px groove #a1a1a1;
border-radius: 5px;
padding: 6px;
`

export const Interior = styled.div`
grid-area: Interior;
padding: 6px;
`
