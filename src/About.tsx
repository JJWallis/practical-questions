import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

interface Letter {
   letter: string
   color: string
}

const WORD_TO_GUESS = 'agent'

const About = () => {
   const [guess, setGuess] = useState({
      userGuess: '',
      guessesRemaining: 6,
   })
   const [squares, setSquares] = useState<Letter[] | null>(null)
   const inputRef = useRef<HTMLInputElement | null>(null)

   const produceGrid = () => {
      const letters = []
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'
      for (let i = 0; i < 15 / 2; i++) {
         const alphaRandom = Math.floor(Math.random() * alphabet.length)
         if (i < WORD_TO_GUESS.length) {
            letters.push({
               letter: WORD_TO_GUESS[i].toUpperCase(),
               color: 'white',
            })
         }
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
         const results = userGuess.map((letter, idx) =>
            wordToGuess.map((l, i) => {
               let color = ''
               color =
                  letter === l && idx === i
                     ? 'green'
                     : letter === l
                     ? 'yellow'
                     : 'grey'
               return {
                  letter,
                  color,
               }
            })
         )
         console.log(results.flat(5).map((l) => l.color !== 'grey' && { ...l }))
         // repetitive code - occuring 5 times
      }
   }

   const determineGridLabel = (color: string) => {
      let str = 'letter guessed '
      str +=
         color === 'green'
            ? 'correctly and in correct spot'
            : color === 'yellow'
            ? 'correctly but in wrong spot'
            : 'incorrectly'
      return str
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
            aria-label="Guess a five letter word"
         />
         <section
            role="grid"
            className="grid-letters"
            aria-label="Letters to guess"
         >
            {squares?.map(({ letter, color }) => (
               <div
                  key={uuid()}
                  role="gridcell"
                  className="grid-letter"
                  style={{ backgroundColor: color }}
               >
                  <p>{letter}</p>
               </div>
            ))}
         </section>
      </main>
   )
}

export default About
