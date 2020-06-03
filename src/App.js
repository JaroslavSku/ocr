import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import Shapes from "././Shapes"
import { rectAction, arrowLine } from "./shapes"
function App() {
  const [paint, setPaint] = useState([
    {
      node: 0,
      xValue: 110,
      yValue: 80,
      shapes: [{ id: 1, type: "rect", x: 10, y: 80, width: 100, height: 100 }],
    },
  ])
  // const [xValue, setXVaue] = useState(200)
  // let xValue = 200
  const initialNode = 0
  function addRectangle() {
    const { xValue } = paint[initialNode] //200
    const newX2 = xValue + 100 //300
    const newWithRectangle = newX2 + 100
    // const savedX = xValue + newX
    const newShapes = [
      ...paint[initialNode].shapes,
      arrowLine(xValue, newX2, 1),
      rectAction(newX2, "Parser"),
    ]
    console.log(newShapes)
    console.log("This is the state paint", paint)
    setPaint({
      ...paint,
      [initialNode]: {
        ...paint[initialNode],
        xValue: newWithRectangle,
        shapes: newShapes,
      },
    })
  }

  function addRedRectangle() {
    const newX = paint[initialNode].xValue //200
    const newX2 = newX + 100 //300
    const newWithRectangle = newX2 + 100
    // const savedX = xValue + newX
    const newShapes = [
      ...paint[initialNode].shapes,
      {
        id: 1,
        type: "line",
        x1: paint[initialNode].xValue,
        y1: 80,
        x2: newX2,
        y2: 80,
        stroke: "black",
      },
      {
        id: 1,
        type: "rect",
        x: newX2,
        y: 80,
        width: 100,
        height: 100,
        fill: "red",
      },
    ]
    console.log(newShapes)
    console.log("This is the state paint", paint)
    setPaint({
      ...paint,
      [initialNode]: {
        ...paint[initialNode],
        xValue: newWithRectangle,
        shapes: newShapes,
      },
    })
  }

  function deleteLast() {
    const newShapes = paint[initialNode].shapes.slice(0, -2)
    const newX = paint[initialNode].xValue - 200
    setPaint({
      ...paint,
      [initialNode]: {
        ...paint[initialNode],
        xValue: newX,
        shapes: newShapes,
      },
    })
  }

  return (
    <div onDoubleClick={deleteLast} className='App'>
      <button onClick={addRedRectangle}>Add redRectangle</button>
      <button onClick={addRectangle}>Add rectangle</button>
      <Shapes paint={paint} node={0} />
    </div>
  )
}

export default App
