import React from 'react'

function flipAndInvertImage(image: number[][]): number[][] {
   return image.reverse()
}

console.log(
   flipAndInvertImage([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
   ])
)

const About: React.FC = () => {
   return <></>
}

export default About
