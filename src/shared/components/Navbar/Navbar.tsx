import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';

export default function Navbar () {
  const languages = [{
    name: 'All',
    param: 'all'
  }, {
    name: 'JavaScript',
    param: 'javascript',
  }, {
    name: 'Ruby',
    param: 'ruby',
  }, {
    name: 'Python',
    param: 'python',
  }, {
    name: 'Java',
    param: 'java',
  }]

  return (
    <div className="navContainer">
      <div className="navTitle">Software languages</div>
      {languages.map(({ name, param }) => (
        <div className="navItem" key={param}>
          <NavLink id={name} style={{textDecoration: "none", color: '#ffffff'}} activeStyle={{fontWeight: 'bold', color: '#e29e9e'}} to={`/Home/${param}`}>
            {name}
          </NavLink>
        </div>
      ))}
    </div>
  )
}