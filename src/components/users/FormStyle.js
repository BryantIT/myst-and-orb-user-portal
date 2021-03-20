import styled from 'styled-components'

export const Form = styled.form`
  padding: 16px;
  width: 90%;
  margin: 0 auto;
`

export const Segment = styled.div`
  padding-bottom: 30px;
  text-align: center;
`

export const Label = styled.label`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
`

export const Input = styled.input`
  margin-right: 8px;
  box-shadow: -5px -5px 20px #a1a1a1;
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
  &:focus {
    box-shadow: inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFF;
`

export const Select = styled.select`
  margin-right: 8px;
  box-shadow: -5px -5px 20px #a1a1a1;
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
  box-shadow: -5px -5px 20px #a1a1a1;
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
