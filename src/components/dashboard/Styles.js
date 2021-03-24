import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const DashboardLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    border: 1px solid #ddd;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  };
  &.active {
    color: #15cdfc;
  }
`
