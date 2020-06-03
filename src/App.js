import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import Shapes from "././Shapes"
import { map, find } from "lodash"
import { rectAction, arrowLine, components } from "./shapes"
function App() {
  const [paint, setPaint] = useState([
    {
      node: 0,
      xValue: 110,
      yValue: 200,
      shapes: [
        {
          id: 1,
          position: 0,
          type: "rect",
          x: 10,
          y: 200,
          width: 100,
          height: 100,
        },
      ],
    },
  ])
  // const [xValue, setXVaue] = useState(200)
  // let xValue = 200
  const initialNode = 0
  const defaultLength = 0
  function addRectangle() {
    const { xValue, yValue } = paint[initialNode] //200
    const newX2 = xValue + 100 //300
    const newWithRectangle = newX2 + 100
    // const savedX = xValue + newX
    const newShapes = [
      ...paint[initialNode].shapes,
      arrowLine(xValue, newX2, yValue, 1),
      rectAction(1, newX2, yValue, "Parser"),
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

  function addCustomRectangle(color, text, position, requiredFor) {
    const { xValue, yValue } = paint[initialNode] //200
    const newX2 = xValue + 100 //300
    const newWithRectangle = newX2 + 100
    // const savedX = xValue + newX
    console.log("this is required for value", requiredFor)
    const requirementFullfilled = find(
      paint[initialNode].shapes,
      (shape) => shape.position === requiredFor
    )

    console.log("requirements", requirementFullfilled)
    if (!requirementFullfilled) {
      alert(`You need to add element${requiredFor}`)
    } else {
      const newShapes = [
        ...paint[initialNode].shapes,
        arrowLine(xValue, newX2, yValue, position),
        rectAction(position, newX2, yValue, text, color),
      ]
      console.log(newShapes)
      console.log("This is the state paint", paint)
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
  }
  // generate XML potrebuje parser, checknout jestli je na pozici pred chooseparser
  // if id 3 and not 2 error - pred generate xml musi byt parser
  //
  function getLastElementId() {
    const maxVal = Math.max(
      ...paint[initialNode].shapes.map((shape) => shape.position)
    )
    console.log(maxVal)
    return maxVal
  }
  console.log("Last element id", getLastElementId())
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
      {map(components, (component) => {
        return (
          <button
            onClick={() =>
              addCustomRectangle(
                component.color,
                component.name,
                component.position,
                component.requiredFor
              )
            }
          >
            {component.id} {component.name}
          </button>
        )
      }).splice(getLastElementId())}
      <Shapes paint={paint} node={0} />
    </div>
  )
}

export default App
