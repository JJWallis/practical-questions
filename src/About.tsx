import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

interface Letter {
   letter: string
   color: string
}

const WORD_TO_GUESS = 'agena'

// Repeat letters in both the word and guess should be handled correctly
// Submissions with repeat letters should provide valid feedback
// (e.g. daily word='baring', submitted word='abbey', the 'a' and the first 'b' should be highlighted yellow)

const About = () => {
   const [guess, setGuess] = useState({
      userGuess: '',
      guessesRemaining: 6,
   })
   const [squares, setSquares] = useState<Letter[]>([])
   const [hasWon, setHasWon] = useState(false)
   const inputRef = useRef<HTMLInputElement | null>(null)
   const updateGuessesRemaining = useRef(false)

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
         // don't find() - all letters turn to same color
         // still map() => check curr idx + see if results[idx] is truthy (we haven't finished adding results yet)
         // if true => do below code (find())
         // else = return square (add rest of currState)
         // could get rid of wrong letters in square?
         const included = results.find(
            ({ letter }) => letter.toUpperCase() === square.letter
         )
         return included ? { ...square, color: included.color } : square
      })
      setSquares(newState)
   }

   const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter') {
         const wordToGuess = WORD_TO_GUESS.split('')
         const userGuess = guess.userGuess.split('')
         const results = userGuess.map((letter, idx) => {
            // const regex = new RegExp(`\\${letter}\\2+`, 'gi')
            // const search = regex.exec(WORD_TO_GUESS)
            // const newIdx = search?.index || -1
            // console.log(search)

            // filter each guessed letter + check all idxs found at in wordToGuess (nested loop)
            // obj of letter + each idx found => use to loop userGuess + check if letter found at idxs
            // return new obj with letter + color for each result/iteration - produceGrid => change from find()

            const guessIdx = WORD_TO_GUESS.indexOf(letter)
            const color =
               guessIdx === -1 ? 'grey' : guessIdx === idx ? 'green' : 'yellow'
            return { letter, color }
         })

         console.log(wordToGuess, userGuess)
         updateGrid(results)
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

   useEffect(() => {
      if (updateGuessesRemaining.current) {
         const hasWon =
            squares.filter(({ color }) => color === 'green').length >= 5 // change to === post duplicate solution
         if (hasWon) {
            setHasWon(hasWon)
            return
         }
         setGuess((prev) => ({
            ...prev,
            guessesRemaining: prev.guessesRemaining - 1,
         }))
      }
      if (squares.length) updateGuessesRemaining.current = true
   }, [squares])

   return (
      <main>
         {hasWon && (
            <p>
               You correctly guessed the word in {guess.guessesRemaining} tries!
            </p>
         )}
         {guess.guessesRemaining > 0 ? (
            <>
               <h2 className="title">
                  You have {guess.guessesRemaining} guesses remaing
               </h2>
               <input
                  value={guess.userGuess}
                  onChange={(e) =>
                     setGuess({ ...guess, userGuess: e.target.value })
                  }
                  className="input"
                  onKeyDown={(e) =>
                     guess.userGuess.length === 5 && handleKeyDown(e)
                  }
                  ref={inputRef}
                  maxLength={5}
                  aria-label="Guess a five letter word"
                  disabled={hasWon}
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
            </>
         ) : (
            <p>The word was {WORD_TO_GUESS}</p>
         )}
         <Link to="/carousel">carousel</Link>
      </main>
   )
}

export default About
