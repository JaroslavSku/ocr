import React from "react"
import "./App.css"
import "./scsss/styles.scss"
import Draw from "./Draw"
import { map } from "lodash"
import { useSelector, useDispatch } from "react-redux"
import { handleButtons } from "./store/actions/componentActions"
import { closeMenu } from "./store/actions/menuAction"
import { addObject } from "./store/actions/drawedObjectsActions"
import { show } from "redux-modal"
import OrderFinishedModal from "./store/modals/OrderFinishedModal"
import getLastElementId from "./store/helpers/getLastId"

function App() {
  const { xPosition, yPosition } = useSelector((state) => state.menu.bubbleMenu)
  const components = useSelector((state) => state.components)
  const drawedObjects = useSelector((state) => state.draw)
  const dispatch = useDispatch()
  let clickTimeout = null

  function addCustomRectangle(color, name, position, types, type, optionValue) {
    const lastId = getLastElementId(drawedObjects)
    console.log("added element", name, lastId, optionValue)
    dispatch(addObject(lastId, position, type, name, color, types, optionValue))
    dispatch(handleButtons(position, name))
    checkIfFinished(name)
    dispatch(closeMenu())
  }

  function checkIfFinished(name) {
    if (name === "GenerateOutput") {
      console.log("Order finished")
      dispatch(show("orderFinishedModal"))
    }
  }

  function closeNav() {
    dispatch(closeMenu())
  }

  const handleClicks = () => {
    if (clickTimeout !== null) {
      console.log("double click executes")
      //delete Item
      clearTimeout(clickTimeout)
      clickTimeout = null
    } else {
      console.log("single click")
      clickTimeout = setTimeout(() => {
        console.log("first click executes ")
        // open menu
        clearTimeout(clickTimeout)
        clickTimeout = null
      }, 2000)
    }
  }

  return (
    <div className='App'>
      <OrderFinishedModal />
      <div
        style={{ left: xPosition, top: yPosition }}
        className='shapes-bubble'
      >
        {map(
          components,
          ({ disabled, color, name, position, types, type, optionValue }) => {
            return (
              <div>
                <button
                  className='shapes-button'
                  disabled={disabled}
                  onClick={() =>
                    addCustomRectangle(
                      color,
                      name,
                      position,
                      types,
                      type,
                      optionValue
                    )
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
