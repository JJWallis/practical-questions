import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
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
   | {
        type: 'REMOVE_ITEM'
        payload: number
     }
   | {
        type: 'TOGGLE_ITEM'
        payload: number
        checked: boolean
     }

// link same idx as item viewing in results list with its btn's (add accessibility) tab index
// reset input to empty str on result btn click + re-focus

const LOCAL_STORAGE_KEY = 'shoppingList'

function retrieveShoppingList(): ShoppingList {
   const prevList = localStorage.getItem(LOCAL_STORAGE_KEY)
   return prevList ? JSON.parse(prevList) : []
}

function reducer(state: ShoppingList, action: ShoppingListActions) {
   const { type, payload } = action
   switch (type) {
      case 'ADD_ITEM': {
         return [...state, action.payload]
      }
      case 'TOGGLE_ITEM': {
         // return state.map((item) =>
         //    item.id === payload
         //       ? {
         //            ...item,
         //            ['checked' as keyof ShoppingListItem]: !item.checked,
         //         }
         //       : item
         // )
         const copy = state
         const target = copy.find(
            ({ id }) => id === payload
         ) as ShoppingListItem
         target.checked = action.checked
         return copy
      }
      case 'REMOVE_ITEM': {
         return state.filter(({ id }) => id !== payload)
      }
      default: {
         return state
      }
   }
}

const App: FC = () => {
   const [shoppingList, dispatch] = useReducer(
      reducer,
      [],
      retrieveShoppingList
   )

   const [search, setSearch] = useState('')
   const searchRef = useRef<HTMLInputElement>(null)

   useEffect(() => searchRef.current?.focus(), [])
   useEffect(
      () =>
         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shoppingList)),
      [shoppingList]
   )

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
            {shoppingList.map(({ checked, value, id }) => (
               <li key={uuid()}>
                  <div>
                     <input
                        type="checkbox"
                        aria-label="toggle food item"
                        checked={checked}
                        onChange={({ target }) =>
                           dispatch({
                              type: 'TOGGLE_ITEM',
                              payload: id,
                              checked: target.checked,
                           })
                        }
                     />
                     {value}
                  </div>
                  <button aria-label="remove food item">&times;</button>
               </li>
            ))}
         </ul>
      </main>
   )
}

export default App
