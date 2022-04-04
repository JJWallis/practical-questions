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
   const [squares, setSquares] = useState<Letter[]>([])
   const inputRef = useRef<HTMLInputElement | null>(null)

   const produceGrid = () => {
      const letters = []
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'
      for (let i = 0; i < 11; i++) {
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

   const updateGrid = (results: Letter[]) => {
      const currState = [...squares]
      const newState = currState.map((square) => {
         const included = results.find(({ letter }) => letter === square.letter)
         return included ? { ...square, color: included.color } : square
      })
      setSquares(newState)
   }

   const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter') {
         // const wordToGuess = WORD_TO_GUESS.split('')
         const userGuess = guess.userGuess.split('')
         const results = userGuess.map((letter, idx) => {
            const guessIdx = WORD_TO_GUESS.indexOf(letter) // repeat letters - wont work
            const color =
               guessIdx === -1 ? 'grey' : guessIdx === idx ? 'green' : 'yellow'
            return { letter, color }
         })
         console.log(results)
         updateGrid(results)
         // solved? => override any prev state with new letters (not ones originally in grid)
      }
   }

   const determineGridLabel = (color: string) => {
      let str = 'letter guessed '
      if (color === 'green') str += 'correctly and in correct spot'
      if (color === 'yellow') str += 'correctly but not in correct spot'
      if (color === 'grey') str += 'incorrectly'
      if (color === 'white') str = 'letter not yet guessed'
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
                  aria-label={`${letter}  ${determineGridLabel(color)}`}
               >
                  <p>{letter}</p>
               </div>
            ))}
         </section>
      </main>
   )
}

export default About
