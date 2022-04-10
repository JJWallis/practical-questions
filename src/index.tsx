import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import About from './About'
import Carousel from './Carousel'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/carousel" element={<Carousel />} />
         </Routes>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
)
