import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import About from './About'
import Carousel from './Carousel'
import Test from './Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dice from './Dice'

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/test" element={<Test />} />
            <Route path="/dice" element={<Dice />} />
         </Routes>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
)
