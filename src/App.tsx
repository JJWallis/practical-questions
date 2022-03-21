import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
import './index.css'

type ShoppingList = ShoppingListItem[] | []
interface ShoppingListItem {
   id: number
   checked: boolean
   value: string
}
type ShoppingListActions =
   | {
        type: 'ADD_ITEM'
        payload: ShoppingListItem
     }
   | {}
   | {}

// link same idx as item viewing in results list with its btn's (add accessibility) tab index
// reset input to empty str on result btn click + re-focus

function retrieveShoppingList(key: string): ShoppingList {
   const prevList = localStorage.getItem(key)
   return prevList ? JSON.parse(prevList) : []
}

function reducer(action, state: ShoppingList) {
   const { type } = action
   switch (state) {
      case type: {
         return {}
      }
      default: {
         return state
      }
   }
}

const App: FC = () => {
   const [shoppingList, dispatch] = useReducer<ShoppingList>(
      reducer,
      [],
      retrieveShoppingList
   )
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
