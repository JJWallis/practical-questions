import React, { FC } from 'react'
import { RouteProps } from 'react-router-dom'

interface Props extends RouteProps {}

const About: FC<Props> = ({}) => {
   return <div>About page!</div>
}

export default About
