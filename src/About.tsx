import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const About: FC = () => {
   return (
      <>
         <Link to="/">App</Link>
         <Link to="/home">Home</Link>
         <div style={{ color: 'green' }}>About page!</div>
      </>
   )
}

export default About
