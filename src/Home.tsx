import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Home: FC = () => {
   return (
      <div>
         <Link to="/about">About</Link>
         <div>Home page!</div>
      </div>
   )
}

export default Home
