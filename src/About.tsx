import React from 'react'

// user has 6 attempts (wins if guesses correct < 6)
// highlight each try => yellow if letter present + wrong position
// green => letter present + correct position | greyed out => letter not present

const About = () => {
   return (
      <main>
         <h2 className="title">You have 3 guesses remaing</h2>
         <input />
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
