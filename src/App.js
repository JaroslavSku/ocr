import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import "./scsss/styles.scss"
import Draw from "./Draw"
import { map, find } from "lodash"
import { generateShapes, arrowLine } from "./shapes"
import { useSelector, useDispatch } from "react-redux"
import {
  handleButtons,
  disableButton,
  enableButton,
} from "./store/actions/componentActions"
import { closeMenu } from "./store/actions/menuAction"
import { addObject } from "./store/actions/drawedObjectsActions"

function App() {
  const { xPosition, yPosition } = useSelector((state) => state.menu.bubbleMenu)
  const components = useSelector((state) => state.components)
  const drawedObjects = useSelector((state) => state.draw)
  const dispatch = useDispatch()
  const initialNode = 0
  const defaultWidth = 100

  function addCustomRectangle(color, name, position, types, type) {
    const { xValue, yValue } = drawedObjects[initialNode] //200
    const newX2 = xValue + 100 //300
    const lastId = getLastElementId()
    console.log("added element", name, lastId)
    dispatch(addObject(lastId, position, type, name, color, types))
    dispatch(enableButton(position))
  }

  function getLastElementId() {
    const maxVal = Math.max(
      ...drawedObjects[initialNode].shapes.map((shape) => {
        if (shape.id) {
          return shape.id
        }
        return 0
      })
    )
    console.log("max element id", maxVal)
    return maxVal
  }

  function deleteLast() {
    const lastId = getLastElementId()
    const newShapes = drawedObjects[initialNode].shapes.slice(0, -2)
    const newX = drawedObjects[initialNode].xValue - 200
    console.log(lastId)
    dispatch(disableButton(lastId))
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
        {map(
          components,
          ({ disabled, color, name, position, prerequisite, types, type }) => {
            return (
              <div>
                <button
                  className='shapes-button'
                  disabled={disabled}
                  onClick={() =>
                    addCustomRectangle(color, name, position, types, type)
                  }
                >
                  <div className='shapes-tooltip'>{name}</div>
                  <img src={require(`./assets/${name}.svg`)} />
                </button>
              </div>
            )
          }
        )}
      </div>
      <div className='shapes-drawings'>
        <Draw drawedObjects={drawedObjects} node={0} />
      </div>
    </div>
  )
}

export default App
