import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

const MAX_DICE = 6
const TOTAL_NUM = 99

const dotCoordinates = [
   '20:20',
   '30:30 40:40',
   '50:50 60:60 70:70',
   '80:80 90:90 100:100 120:120',
]

const Dice: React.FC = () => {
   const [dice, setDice] = useState<JSX.Element[]>([])
   const [diceNum, setDiceNum] = useState(1)

   const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(target.value)
      if (val > 0 && val < 100) setDiceNum(val)
   }

   const produceDice = () => {
      //   const randomNum = Math.floor(Math.random() * TOTAL_NUM) + 1
      //   dotCoordinates[String(randomNum) as keyof] => return dice +
      //   split (' ') + map() over arr within to produce
      //   dots inside using each val (inc key)
      const diceArr = dotCoordinates.map((cordPair, idx) => {
         const pair = cordPair.split(' ')
         return (
            <div
               key={uuid()}
               className="dice"
               aria-label={`${idx + 1} sided dice`}
            >
               {pair.map((val) => {
                  const [x, y] = val.split(':')
                  return (
                     <div
                        key={uuid()}
                        className="dice-dot"
                        style={{ left: `${x}`, top: `${y}` }}
                     ></div>
                  )
               })}
            </div>
         )
      })
      setDice(diceArr)
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
            {dice}
         </div>
      </main>
   )
}

export default Dice
