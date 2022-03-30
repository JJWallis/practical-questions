import React from 'react'

const About = () => {
   return <></>
}

export default About

// // const grabTime = () => {
//   const currDate = new Date();
//   const seconds = currDate.getSeconds();
//   const minutes = currDate.getMinutes();
//   const hours = currDate.getHours();
//   return { seconds, minutes, hours };
// };

// const App = () => {
//   const [{ seconds, minutes, hours }, setDate] = React.useState(() =>
//     grabTime()
//   );
//   const [time, setTime] = React.useState(0);
//   const timerRef = React.useRef(null);
//   const circumference = 2 * Math.PI * 170;

//   const setupTimer = () => {
//     const timerId = setInterval(
//       () => setTime((prevTime) => prevTime + 1),
//       1000
//     );
//     timerRef.current = timerId;
//   };

//   const produceHours = () => {
//     const hours = [];
//     for (let i = 1; i <= 12; i++)
//       hours.push(
//         <span
//           style={{
//             transform: `translate(${(i / 12) * 360}px, ${(i / 12) * 360}px)`
//           }}
//           className="hour"
//           aria-label={`${i} hour`}
//         >
//           {i}
//         </span>
//       );
//     console.log(hours.reverse());
//     return hours.reverse();
//   };

//   // React.useEffect(() => setupTimer(), []);
//   React.useEffect(() => setDate(grabTime()), [time]);

//   return (
//     <article aria-label="clock" className="clock">
//       <div className="straight"></div>
//       <div className="ninety"></div>
//       <div
//         className="hours-hand hand"
//         aria-label="hours-hand"
//         style={{
//           transform: `rotate(${(hours / 12) * 360}deg)`
//         }}
//       ></div>
//       <div
//         className="minutes-hand hand"
//         aria-label="hours-hand"
//         style={{
//           transform: `rotate(${(minutes / 60) * 360}deg)`
//         }}
//       ></div>
//       <div
//         className="seconds-hand hand"
//         aria-label="hours-hand"
//         style={{
//           transform: `rotate(${(seconds / 60) * 360}deg)`
//         }}
//       ></div>
//     </article>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("app"));
