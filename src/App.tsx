import React, { FC } from 'react'
import './index.css'

const App: FC = () => {
   return (
      <main>
         <h1>My Shopping List</h1>
         <label htmlFor="search-input" className="label">
            Food search
         </label>
         <input id="search-input" className="input" />
      </main>
   )
}

export default App
