import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './index.css'

interface ShoppingListItem {
   id: string
   checked: boolean
   value: string
}
interface SearchResults {
   searchTerm: string
   results: string[]
}
type ShoppingList = ShoppingListItem[] | []
type ShoppingListActions =
   | {
        type: 'ADD_ITEM'
        payload: ShoppingListItem
     }
   | {
        type: 'REMOVE_ITEM'
        payload: string
     }
   | {
        type: 'TOGGLE_ITEM'
        payload: string
        checked: boolean
     }

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
         const copy = [...state]
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
   const [searchResults, setSearchResults] = useState<SearchResults>({
      searchTerm: '',
      results: [],
   })
   const searchRef = useRef<HTMLInputElement>(null)
   const resultItems = useRef<Map<number, HTMLButtonElement> | null>(null)
   const timerRef = useRef<NodeJS.Timeout | null>(null)

   const getMap = () => {
      if (!resultItems.current) resultItems.current = new Map()
      return resultItems.current
   }

   const focusResultBtn = (
      { key }: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement>,
      id: number
   ) => {
      const {
         results: { length: resultsLength },
      } = searchResults
      if (key === 'ArrowDown' || key === 'ArrowUp') {
         if (resultsLength > 0) {
            const idx = (id as number) + (key === 'ArrowDown' ? 1 : -1)
            const map = getMap()
            const targetItem = map.get(idx)
            targetItem?.focus()
         }
      }
   }

   const handleResultBtn = (
      e: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement>,
      id?: number
   ) => {
      const { results, searchTerm } = searchResults
      const { length: resultsLength } = results
      focusResultBtn(e, id as number)
      if (e.key === 'Enter' && searchResults.searchTerm) {
         if (!resultsLength || resultsLength === 1)
            dispatch({
               type: 'ADD_ITEM',
               payload: {
                  id: uuid(),
                  checked: false,
                  value: searchTerm,
               },
            })
      }
   }

   const debounce = (fn: any, timeout = 500) => {
      let timer: NodeJS.Timeout
      return (...args: any) => {
         clearTimeout(timer)
         timer = setTimeout(() => fn(...args), timeout)
         return timer
      }
   }

   useEffect(() => {
      if (searchResults.searchTerm.length >= 2) {
         const fetchResults = async () => {
            try {
               const res = await fetch(
                  `https://api.frontendeval.com/fake/food/${searchResults.searchTerm}`
               )
               const data: string[] = await res.json()
               setSearchResults((prevResults) => ({
                  ...prevResults,
                  results: data,
               }))
               console.log(data)
            } catch (error: any) {
               console.error(error.message)
            }
         }
         timerRef.current = debounce(() => fetchResults())()
      } else {
         if (timerRef.current) clearTimeout(timerRef.current)
         setSearchResults((prevResults) => ({
            ...prevResults,
            results: [],
         }))
      }
   }, [searchResults.searchTerm])

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
            value={searchResults.searchTerm}
            onChange={(e) =>
               setSearchResults({
                  ...searchResults,
                  searchTerm: e.target.value,
               })
            }
            onKeyDown={(e) => handleResultBtn(e, -1)}
         />
         <ol className="results-list">
            {searchResults.results?.map((result, idx) => (
               <li key={uuid()}>
                  <button
                     aria-label="Add to shopping list"
                     ref={(node) => {
                        const map = getMap()
                        const key = idx
                        if (node) map.set(key, node)
                        else map.delete(key)
                     }}
                     onKeyDown={(e) => handleResultBtn(e, idx)}
                     onClick={({ currentTarget }) => {
                        dispatch({
                           type: 'ADD_ITEM',
                           payload: {
                              id: uuid(),
                              checked: false,
                              value: currentTarget.textContent as string,
                           },
                        })
                     }}
                  >
                     {result}
                  </button>
               </li>
            ))}
         </ol>
         <hr className="separator" />
         <ul className="shopping-list">
            {shoppingList.map(({ checked, id, value }) => (
               <li key={uuid()}>
                  <div>
                     <input
                        type="checkbox"
                        aria-label={`toggle ${value} item`}
                        checked={checked}
                        onChange={(e) =>
                           dispatch({
                              type: 'TOGGLE_ITEM',
                              payload: id,
                              checked: e.target.checked,
                           })
                        }
                     />
                     <span
                        style={{
                           textDecoration: `${checked && 'line-through'}`,
                        }}
                     >
                        {value}
                     </span>
                  </div>
                  <button
                     aria-label={`remove ${value} item`}
                     onClick={() =>
                        dispatch({ type: 'REMOVE_ITEM', payload: id })
                     }
                  >
                     &times;
                  </button>
               </li>
            ))}
         </ul>
         <Link to="/about">About</Link>
      </main>
   )
}

export default App
