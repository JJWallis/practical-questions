import React, { FC, useEffect, useRef, useState } from 'react'
import './index.css'

// link same idx as item viewing in results list with its btn's (add accessibility) tab index
// reset input to empty str on result btn click + re-focus

const App: FC = () => {
   const [search, setSearch] = useState('')
   const searchRef = useRef<HTMLInputElement>(null)

   useEffect(() => searchRef.current?.focus(), [])

   return (
      <main>
         <h1>My Shopping List</h1>
         <label htmlFor="search-input" className="label">
            Food search
         </label>
         <input
            id="search-input"
            className="input"
            ref={searchRef}
            value={search}
            onChange={({ target }) => setSearch(target.value)}
         />
         <ol className="results-list">
            <li>
               <button>bread</button>
            </li>
            <li>
               <button>milk</button>
            </li>
         </ol>
         <hr className="separator" />
         <ul className="shopping-list">
            <li>
               <div>
                  <input aria-label="toggle food item" type="checkbox" />
                  bread
               </div>
               <button aria-label="remove food item">&times;</button>
            </li>
         </ul>
      </main>
   )
}

export default App
