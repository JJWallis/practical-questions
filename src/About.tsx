import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const About: FC = () => {
   return (
      <>
         <Link to="/">Home</Link>
         <div>About page!</div>
      </>
   )
}

export default About
