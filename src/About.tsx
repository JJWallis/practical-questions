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

//    const setupTimer = () => {
//       const timerId = setInterval(
//          () => setTime((prevTime) => prevTime + 1),
//          1000
//       )
//       timerRef.current = timerId
//    }

//    //   intermediary function to perform maths - desired date prop / total * circumference

//    return (
//       <article aria-label="clock" className="clock">
//          <div className="hours-hand hand" aria-label="hours-hand"></div>
//          <div className="minutes-hand hand" aria-label="hours-hand"></div>
//          <div className="seconds-hand hand" aria-label="hours-hand"></div>
//       </article>
//    )
// }

// ReactDOM.render(<App />, document.getElementById('app'))

// // *,
// // *::before,
// // *::after {
// //   box-sizing: border-box;
// // }

// // body {
// //   display: grid;
// //   place-content: center;
// //   min-height: 100vh;
// //   margin: 0;
// //   padding: 0;
// // }

// // .clock {
// //   position: relative;
// //   border: 1px solid black;
// //   width: 350px;
// //   height: 350px;
// //   border-radius: 50%;
// // }

// // .hand {
// //   position: absolute;
// //   top: 0;
// //   right: 50%;
// //   height: 50%;
// //   border: 1px solid black;
// // }
