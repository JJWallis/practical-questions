import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'

const App: FC = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<div>404 - Page not found!</div>} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
