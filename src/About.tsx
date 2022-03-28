import React from 'react'

function flipAndInvertImage(image: number[][]): number[][] {
   return image.map((numArr) =>
      numArr.reverse().map((num) => (num === 0 ? 1 : 0))
   )
}

console.log(
   flipAndInvertImage([
      [1, 1, 0],
      [1, 0, 1],
      [0, 0, 0],
   ])
)

const About: React.FC = () => {
   return <></>
}

export default About
