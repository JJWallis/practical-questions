import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
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
   resultsFocus: number
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
      resultsFocus: 0,
   })
   const searchRef = useRef<HTMLInputElement>(null)
   const resultItems = useRef<Map<any, any> | null>(null)

   const getMap = () => {
      if (!resultItems.current) resultItems.current = new Map()
      return resultItems.current
   }

   const handleResultBtn = ({
      key,
   }: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement>) => {
      const { resultsFocus, results, searchTerm } = searchResults
      const { length: resultsLength } = results
      if (key === 'ArrowDown' || key === 'ArrowUp') {
         if (resultsLength > 0) {
            setSearchResults((prevResults) => ({
               ...prevResults,
               resultsFocus:
                  key === 'ArrowDown' && resultsFocus < resultsLength
                     ? resultsFocus + 1
                     : key === 'ArrowUp' && resultsFocus > 0
                     ? resultsFocus - 1
                     : resultsLength, // fix upwards bug
            }))
            // console.log(key, resultsFocus)
         }
      }
      if (key === 'Enter' && searchResults.searchTerm) {
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
         fetchResults()
      } else {
         setSearchResults((prevResults) => ({
            ...prevResults,
            results: [],
            resultsFocus: 0,
         })) // reset results list so prevResults don't persist
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
            onKeyDown={handleResultBtn}
         />
         <ol className="results-list">
            {searchResults.results?.map((result, idx) => (
               <li key={uuid()}>
                  <button
                     // addBtnRef + map() = check if resultsFocus state num === idx + 1 (addBtnRef focused)
                     onKeyDown={handleResultBtn}
                     onClick={({ currentTarget }) => {
                        dispatch({
                           type: 'ADD_ITEM',
                           payload: {
                              id: uuid(),
                              checked: false,
                              value: currentTarget.textContent as string,
                           },
                        })
                        searchRef.current?.focus()
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
                        aria-label="toggle food item"
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
                     aria-label="remove food item"
                     onClick={() =>
                        dispatch({ type: 'REMOVE_ITEM', payload: id })
                     }
                  >
                     &times;
                  </button>
               </li>
            ))}
         </ul>
      </main>
   )
}

export default App
