import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {}

const Home: FC<Props> = () => {
   return (
      <div>
         <Link to="/">App</Link>
         <Link to="/about">About</Link>
         <div style={{ color: 'orange' }}>Home page!</div>
      </div>
   )
}

export default Home
