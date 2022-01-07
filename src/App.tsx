import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const App: FC = () => {
   return (
      <>
         <div style={{ color: 'red' }}>App page!</div>
         <Link to="/home">Home</Link>
         <Link to="/about">About</Link>
      </>
   )
}

export default App
