import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

const WORD_TO_GUESS = 'agent'

const About = () => {
   const [guess, setGuess] = useState({
      userGuess: '',
      guessesRemaining: 6,
   })
   const [squares, setSquares] = useState<
      | {
           letter: string
           color: string
        }[]
      | null
   >(null)
   const inputRef = useRef<HTMLInputElement | null>(null)

   const produceGrid = () => {
      const letters = []
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
      for (let i = 0; i < 15 / 2; i++) {
         const alphaRandom = Math.floor(Math.random() * alphabet.length)
         if (i < WORD_TO_GUESS.length)
            letters.push({
               letter: WORD_TO_GUESS[i].toUpperCase(),
               color: 'white',
            })
         letters.push({
            letter: alphabet[alphaRandom].toUpperCase(),
            color: 'white',
         })
      }
      setSquares(letters)
   }

   const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter') {
         const wordToGuess = WORD_TO_GUESS.split('')
         const userGuess = guess.userGuess.split('')
         const results = wordToGuess.map((letter, idx) =>
            userGuess.map((l, i) => {
               let color = ''
               color =
                  letter === l && idx === i
                     ? 'green'
                     : letter === l
                     ? 'yellow'
                     : 'red'
               return {
                  l,
                  color,
               }
            })
         )
         return results.flat(5)
         // console.log(results.flat(5))
         // put sqaures into state - model as obj with color prop (white if null)
      }
   }

   useEffect(() => {
      produceGrid()
      inputRef?.current?.focus()
   }, [])

   return (
      <main>
         <h2 className="title">
            You have {guess.guessesRemaining} guesses remaing
         </h2>
         <input
            value={guess.userGuess}
            onChange={(e) => setGuess({ ...guess, userGuess: e.target.value })}
            className="input"
            onKeyDown={(e) => guess.userGuess.length === 5 && handleKeyDown(e)}
            ref={inputRef}
            maxLength={5}
         />
         <div role="grid" className="grid-letters">
            {squares?.map(({ letter, color }) => (
               <div
                  key={uuid()}
                  className="grid-letter"
                  style={{ backgroundColor: color }}
               >
                  {letter}
               </div>
            ))}
         </div>
      </main>
   )
}

export default About
