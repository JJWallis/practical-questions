import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

// user has 6 attempts (wins if guesses correct < 6)
// highlight each try => yellow if letter present + wrong position
// green => letter present + correct position | greyed out => letter not present

const WORD_TO_GUESS = 'agent'

const About = () => {
   const [guess, setGuess] = useState({
      userGuess: '',
      guessesRemaining: 6,
   })
   const inputRef = useRef<HTMLInputElement | null>(null)

   const produceGrid = (word: string) => {
      const letters = []
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
      for (let i = 0; i < 15 / 2; i++) {
         const alphaRandom = Math.floor(Math.random() * alphabet.length)
         if (i < word.length) letters.push(word[i].toUpperCase())
         letters.push(alphabet[alphaRandom].toUpperCase())
      }
      return letters
   }

   const handleKeyDown = ({ key }: React.KeyboardEvent) => {
      // if (key === 'Enter') submit input as guess
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
            onKeyDown={handleKeyDown}
            ref={inputRef}
         />
         <div role="grid" className="grid-letters">
            {produceGrid(WORD_TO_GUESS).map((letter) => (
               <div key={uuid()} className="grid-letter">
                  {letter}
               </div>
            ))}
         </div>
      </main>
   )
}

export default About
