import React from 'react'

const About = () => {
   function sortArrayByParity(nums: number[]): number[] {
      const even: number[] = []
      const odd: number[] = []
      nums.forEach((num) => (num % 2 === 0 ? even.push(num) : odd.push(num)))
      return even.concat(odd)
   }

   console.log(sortArrayByParity([3, 1, 2, 4]))

   return <></>
}

export default About

// const grabTime = () => {
//    const currDate = new Date()
//    const seconds = currDate.getSeconds()
//    const minutes = currDate.getMinutes()
//    const hours = currDate.getHours()
//    return { seconds, minutes, hours }
// }

// const App = () => {
//    const [{ seconds, minutes, hours }, setDate] = React.useState(() =>
//       grabTime()
//    )
//    const [time, setTime] = React.useState(0)
//    const timerRef = React.useRef(null)
//    const circumference = 2 * Math.PI * 170

//    const setupTimer = () => {
//       const timerId = setInterval(
//          () => setTime((prevTime) => prevTime + 1),
//          1000
//       )
//       timerRef.current = timerId
//    }

//    React.useEffect(() => setupTimer(), [])
//    React.useEffect(() => setDate(grabTime()), [time])

//    return (
//       <article aria-label="clock" className="clock">
//          <div
//             className="hours-hand hand"
//             aria-label="hours-hand"
//             style={{
//                transform: `rotate(${(hours / 60) * circumference}deg)`,
//             }}
//          ></div>
//          <div
//             className="minutes-hand hand"
//             aria-label="hours-hand"
//             style={{
//                transform: `rotate(${(minutes / 60) * circumference}deg)`,
//             }}
//          ></div>
//          <div
//             className="seconds-hand hand"
//             aria-label="hours-hand"
//             style={{
//                transform: `rotate(${(seconds / 120) * circumference}deg)`,
//             }}
//          ></div>
//       </article>
//    )
// }

// ReactDOM.render(<App />, document.getElementById('app'))

// // // *,
// // // *::before,
// // // *::after {
// // //   box-sizing: border-box;
// // // }

// // // body {
// // //   display: grid;
// // //   place-content: center;
// // //   min-height: 100vh;
// // //   margin: 0;
// // //   padding: 0;
// // // }

// // // .clock {
// // //   position: relative;
// // //   border: 1px solid black;
// // //   width: 350px;
// // //   height: 350px;
// // //   border-radius: 50%;
// // // }

// // // .hand {
// // //   position: absolute;
// // //   top: 0;
// // //   right: 50%;
// // //   height: 50%;
// // //   border: 1px solid black;
// // // }
