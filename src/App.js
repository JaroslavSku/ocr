import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import "./scsss/styles.scss"
import Draw from "./Draw"
import { map, find } from "lodash"
import { rectAction, arrowLine, components } from "./shapes"
import { useSelector } from "react-redux"
import { enableButton } from "./store/actions/componentActions"

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
          x: 50,
          y: 200,
          width: 100,
          height: 100,
        },
      ],
    },
  ])
  const { xPosition, yPosition } = useSelector((state) => state.menu)
  console.log("App.js", xPosition, yPosition)
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

  async function addCustomRectangle(color, text, position, requiredFor) {
    const { xValue, yValue } = paint[initialNode] //200
    const newX2 = xValue + 100 //300
    const newWithRectangle = newX2 + 100
    // const savedX = xValue + newX
    console.log("this is required for value", requiredFor)
    const requirementFullfilled = find(
      paint[initialNode].shapes,
      (shape) => shape.position === requiredFor
    )
    //prepocitani
    console.log("requirements", requirementFullfilled)
    if (!requirementFullfilled) {
      alert(`You need to add element${requiredFor}`)
    } else {
      // set disabled to false redux
      await enableButton(requiredFor)
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
      <div
        style={{ left: xPosition, top: yPosition }}
        className='shapes-bubble'
      >
        {map(components, (component) => {
          return (
            <div>
              {" "}
              <button
                className='shapes-button'
                disabled={false}
                onClick={() =>
                  addCustomRectangle(
                    component.color,
                    component.name,
                    component.position,
                    component.requiredFor,
                    component.disabled
                  )
                }
              >
                {/* {component.id} */}
                <img src={require(`./assets/${component.name}.svg`)} />
                <div className='shapes-tooltip'>{component.name}</div>
              </button>
            </div>
          )
        }).splice(getLastElementId())}
      </div>
      <div className='shapes-drawings'>
        <Draw paint={paint} node={0} />
      </div>
    </div>
  )
}

export default App
