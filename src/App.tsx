import React, { FC, useState } from 'react'
import './index.css'

const App: FC = () => {
   const [search, setSearch] = useState('')

   return (
      <main>
         <h1>My Shopping List</h1>
         <label htmlFor="search-input" className="label">
            Food search
         </label>
         <input
            id="search-input"
            className="input"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
         />
      </main>
   )
}

export default App
