import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import Shapes from "././Shapes"

function App() {
  const [paint, setPaint] = useState([
    {
      node: 0,
      xValue: 200,
      yValue: 80,
      shapes: [
        {
          id: 1,
          type: "line",
          x1: 0,
          y1: 80,
          x2: 200,
          y2: 80,
          stroke: "black",
        },
        { id: 2, type: "rect", x: 0, y: 80, width: 100, height: 100 },
      ],
    },
  ])
  // const [xValue, setXVaue] = useState(200)
  let xValue = 200
  const initialNode = 0
  function addRectangle() {
    const newX = xValue + 100
    const newX2 = newX + 100
    const savedX = xValue + newX
    setPaint([
      ...paint[initialNode],

      ...{
        xValue: savedX,
        id: 1,
        type: "line",
        x1: xValue,
        y1: 80,
        x2: newX2,
        y2: 80,
        stroke: "black",
      },
    ])
    // setXVaue(newX)
    // xValue = xValue + newX
  }
  return (
    <div className='App'>
      <button onClick={addRectangle}>Add rectangle</button>
      <Shapes paint={paint} />
    </div>
  )
}

export default App
