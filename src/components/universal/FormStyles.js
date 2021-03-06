import styled from 'styled-components'

export const Form = styled.form`
  padding: 16px;
  width: 90%;
  margin: 0 auto;
`

export const ChoiceContainer = styled.div`
  padding: 16px;
  width: 90%;
  margin: 0 auto;
`

export const Segment = styled.div`
  padding-bottom: 30px;
  text-align: center;
`
export const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.61);
`

export const ModalInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: -5px -5px 20px #a1a1a1;
  transform: translate(-50%, -50%);
`

export const Label = styled.label`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
`

export const TeamsLabel = styled.label`
  display: block;
  text-align: center;
  width: 100%;
`

export const ButtonsContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%;
`

export const Input = styled.input`
  margin-right: 8px;
  box-shadow: -5px -5px 20px ${props => props.color};
  width: 50%;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;
  appearance: none;
  -webkit-appearance: none;
  color: white;
  border: 0;
  outline: 0;
  font-size: 16px;
  border-radius: 320px;
  padding: 16px;
  background-color: #000000;
  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  &:focus {
    box-shadow: inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFF;
`

export const ProfileImage = styled.img`

  display: inline-block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: -5px -5px 40px ${props => props.color};
  background-color: #000000;
  transition: all 0.2s ease-in-out;
  object-fit: cover;
  cursor: pointer;
`

export const AvatarUploader = styled.input`
display: none;
`

export const Select = styled.select`
  margin-right: 8px;
  box-shadow: -5px -5px 20px ${props => props.color};
  width: 50%;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;
  color: white;
  border: 0;
  outline: 0;
  font-size: 16px;
  border-radius: 320px;
  padding: 16px;
  background-color: #000000;
  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
`

export const Button = styled.button`
  font-size: 20px;
  font-weight: bold;
  box-shadow: -1px -1px 5px ${props => props.color};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;
  display: block;
  width: 100%;
  color: white;
  border: 0;
  outline: 0;
  border-radius: 320px;
  padding: 16px;
  background-color: #000000;
  &:hover {
    box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
  &:active {
    box-shadow: inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFF;
`

export const MultiButton = styled.button`
font-size: 20px;
font-weight: bold;
box-shadow: -5px -5px 20px ${props => props.color};
transition: all 0.2s ease-in-out;
cursor: pointer;
font-weight: 600;
display: block;
width: 100%;
color: white;
border: 0;
outline: 0;
border-radius: 320px;
padding: 16px;
margin-left: 3px;
margin-right: 3px;
background-color: #000000;
&:hover {
  box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
&:active {
  box-shadow: inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFF;
`
