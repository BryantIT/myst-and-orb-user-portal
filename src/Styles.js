import styled from 'styled-components'

export const Main = styled.div`
  position: auto;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr 1.1fr 0.9fr;
  grid-template-rows: 1fr 0.1fr 1.9fr;
  gap: 0px 0px;
  grid-template-areas:
    "UserInfo Interior Interior AdsContainer"
    "UserInfo Interior Interior AdsContainer"
    "UserTools Interior Interior NewsContainer";
  height: 100vh;
  overflow: auto;
  background: radial-gradient(circle, rgba(55, 53, 53, 1) 0%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%);
  padding: 6px;
  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1.2fr 0.8fr 1fr;
    grid-template-rows: 0.6fr 1.8fr 0.6fr;
    gap: 0px 0px;
    grid-template-areas:
    "Interior Interior Interior Interior"
    "NewsContainer NewsContainer NewsContainer NewsContainer"
    "UserInfo UserInfo AdsContainer AdsContainer";
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: radial-gradient(circle, rgba(55, 53, 53, 1) 0%, rgba(0,0,0,1) 100%,rgba(0,0,0,1) 100%);
    padding: 6px;
  }
`

export const UserInfo = styled.div`
grid-area: UserInfo;
border: 1px groove #a1a1a1;
border-radius: 5px;
padding: 6px;
margin-bottom: 6px;
`

export const AdsContainer = styled.div`
grid-area: AdsContainer;
border: 1px groove #a1a1a1;
border-radius: 5px;
padding: 6px;
margin-bottom: 6px;
`

export const NewsContainer = styled.div`
grid-area: NewsContainer;
border: 1px groove #a1a1a1;
border-radius: 5px;
padding: 6px;
`

export const UserTools = styled.div`
grid-area: UserTools;
border: 1px groove #a1a1a1;
border-radius: 5px;
padding: 6px;
@media screen and (max-width: 768px) {
  display: none;
}
`

export const Interior = styled.div`
grid-area: Interior;
padding: 6px;
`

export const InteriorMobile = styled.div`
grid-area: InteriorMobile;
padding: 6px;
`
