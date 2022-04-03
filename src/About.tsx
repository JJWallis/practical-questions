import React, { useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

const WORD_TO_GUESS = 'agent'

const produceGrid = () => {
   const letters = []
   const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
   for (let i = 0; i < 15 / 2; i++) {
      const alphaRandom = Math.floor(Math.random() * alphabet.length)
      if (i < WORD_TO_GUESS.length) letters.push(WORD_TO_GUESS[i].toUpperCase())
      letters.push(alphabet[alphaRandom].toUpperCase())
   }
   return letters
}

const About = () => {
   const [guess, setGuess] = useState({
      userGuess: '',
      guessesRemaining: 6,
   })
   // const [squares, setSqaures] = useState(() => produceGrid())
   const inputRef = useRef<HTMLInputElement | null>(null)
   const letters = useMemo(produceGrid, [])

   const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter') {
         const wordToGuess = WORD_TO_GUESS.split('')
         const userGuess = guess.userGuess.split('')
         const results = []
         console.log(wordToGuess, userGuess)
         // map through word to guess arr
         // return obj with letter as prop + color string as value (green, red, grey)
         // put sqaures into state - model as obj with color prop (white if null)
      }
   }

   useEffect(() => inputRef?.current?.focus(), [])

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
            {letters.map((letter) => (
               <div key={uuid()} className="grid-letter">
                  {letter}
               </div>
            ))}
         </div>
      </main>
   )
}

export default About
