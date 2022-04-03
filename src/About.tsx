import React, { useEffect, useRef, useState } from 'react'

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
      const letters = [...word.split('')]
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
      for (let i = 0; i < 15 - word.length; i++) {
         const random = Math.floor(Math.random() * alphabet.length)
         letters.push(alphabet[random])
      }
      return letters
   }

   console.log(produceGrid(WORD_TO_GUESS))

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
            <div className="grid-letter">J</div>
            <div className="grid-letter">J</div>
            <div className="grid-letter">J</div>
            <div className="grid-letter">J</div>
         </div>
      </main>
   )
}

export default About
