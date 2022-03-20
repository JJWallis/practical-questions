import React, { FC, useState } from 'react'
import './index.css'

// link same idx as item viewing in results list with its btn's tab index

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
         <ol>
            <li>
               <button>bread</button>
            </li>
            <li>
               <button>milk</button>
            </li>
         </ol>
      </main>
   )
}

export default App
