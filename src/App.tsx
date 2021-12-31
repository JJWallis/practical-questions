import React, { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import About from './About'

const App: FC = () => {
   return (
      <BrowserRouter>
         <Route path="./About.tsx" element={About} />
      </BrowserRouter>
   )
}

export default App
