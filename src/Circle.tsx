import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  bgColor:string;
}

const Container = styled.div<ContainerProps>`
width: 100px;
height: 100px;
border-radius: 50%;
text-align: center;
line-height:100px;
background-color: ${(props)=> props.bgColor};
`
interface CircleProps{
  bgColor:string;
}
const Circle = ({bgColor}:CircleProps) => {
  return (
    <Container bgColor={bgColor}>Circle</Container>
  )
}

export default Circle