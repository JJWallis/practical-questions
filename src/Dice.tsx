import React, { useState } from 'react'

const MAX_DICE = 6
const TOTAL_NUM = 99

const dotCoordinates = {
   1: '20:20 30:30',
   // 2: '',
   // 3: '',
   // 4: '',
   // 5: '',
   // 6: '',
}

const Dice: React.FC = () => {
   const [dice, setDice] = useState([])
   const [diceNum, setDiceNum] = useState(1)

   const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(target.value)
      if (val > 0 && val < 100) setDiceNum(val)
   }

   const produceDice = () => {
      const random = Math.floor(Math.random() * TOTAL_NUM) + 1
      //   dotCoordinates[String(randomNum) as keyof] => return dice +
      //  split (' ') + map() over arr within to produce
      //   dots inside using each val (inc key)
   }

   return (
      <main>
         <h1>Number of Dice</h1>
         <input
            type="number"
            value={diceNum}
            onChange={handleOnChange}
            className="dice-input"
         />
         <button onClick={produceDice}>Role</button>
         <div role="grid" className="dice-ct">
            {produceDice}
            <div role="gridcell" className="dice" aria-label={'2 sided dice'}>
               <div className="dice-dot"></div>
            </div>
         </div>
      </main>
   )
}

export default Dice
