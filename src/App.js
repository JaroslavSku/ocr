import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import "./scsss/styles.scss"
import Draw from "./Draw"
import { map, find } from "lodash"
import { generateShapes, arrowLine } from "./shapes"
import { useSelector, useDispatch } from "react-redux"
import {
  enableButton,
  disableButton,
  disableAll,
} from "./store/actions/componentActions"
import { closeMenu } from "./store/actions/menuAction"

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
          type: "circle",
          x: 50,
          y: 200,
          width: 100,
          height: 100,
          fill: "black",
        },
      ],
    },
  ])
  const { xPosition, yPosition } = useSelector((state) => state.menu.bubbleMenu)
  const components = useSelector((state) => state.components)
  const dispatch = useDispatch()
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
      generateShapes(1, newX2, yValue, "Parser"),
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

  async function addCustomRectangle(
    color,
    text,
    position,
    prerequisite,
    types,
    type
  ) {
    const { xValue, yValue } = paint[initialNode] //200
    const newX2 = xValue + 100 //300
    const newWithRectangle = newX2 + 100
    // const savedX = xValue + newX
    console.log("this is required for value", prerequisite)
    const requirementFullfilled = find(
      paint[initialNode].shapes,
      (shape) => shape.position === prerequisite
    )
    //prepocitani
    console.log("requirements", requirementFullfilled)
    if (text === "GenerateOutpu") {
      dispatch(disableAll())
    } else {
      // set disabled to false redux
      await dispatch(enableButton(position))
      const newShapes = [
        ...paint[initialNode].shapes,
        arrowLine(xValue, newX2, yValue, position),
        generateShapes(position, type, newX2, yValue, text, color, types),
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
    console.log("getLastElementId", maxVal)
    return maxVal
  }
  console.log("Last element id", getLastElementId())
  function deleteLast() {
    const lastId = getLastElementId()
    const newShapes = paint[initialNode].shapes.slice(0, -2)
    const newX = paint[initialNode].xValue - 200
    console.log(lastId)
    dispatch(disableButton(lastId))
    setPaint({
      ...paint,
      [initialNode]: {
        ...paint[initialNode],
        xValue: newX,
        shapes: newShapes,
      },
    })
  }
  function closeNav() {
    dispatch(closeMenu())
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
                disabled={component.disabled}
                onClick={() =>
                  addCustomRectangle(
                    component.color,
                    component.name,
                    component.position,
                    component.prerequisite,
                    component.types,
                    component.type
                  )
                }
              >
                {/* {component.id} */}

                <div className='shapes-tooltip'>{component.name}</div>
                <img src={require(`./assets/${component.name}.svg`)} />
              </button>
            </div>
          )
        })}
        {/* }).splice(getLastElementId())} */}
      </div>
      <div className='shapes-drawings'>
        <Draw paint={paint} node={0} />
      </div>
    </div>
  )
}

export default App
