import React, { useEffect, useRef, useState } from 'react'

// user has 6 attempts (wins if guesses correct < 6)
// highlight each try => yellow if letter present + wrong position
// green => letter present + correct position | greyed out => letter not present

const About = () => {
   const [guess, setGuess] = useState({
      userGuess: '',
      guessesRemaining: 6,
   })
   const inputRef = useRef<HTMLInputElement | null>(null)

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
