import React, { useEffect } from "react"
import "./App.css"
import "./scsss/styles.scss"
import Draw from "./Draw"
import { map, forEach, filter } from "lodash"
import { useSelector, useDispatch } from "react-redux"
import { handleButtons } from "./store/actions/componentActions"
import { closeMenu, hideBubbleMenu } from "./store/actions/menuAction"
import { addObject } from "./store/actions/drawedObjectsActions"
import { show } from "redux-modal"
import OrderFinishedModal from "./store/modals/OrderFinishedModal"
import getLastElementId from "./store/helpers/getLastId"
import { acceptJSON, saveFormRequirements } from "./store/actions/apiJSON"

function App() {
  const { xPosition, yPosition } = useSelector((state) => state.menu.bubbleMenu)
  const components = useSelector((state) => state.components)
  const drawedObjects = useSelector((state) => state.draw)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(saveFormRequirements()).then(
      dispatch(acceptJSON()).then(({ data: { objects } }) => {
        forEach(objects, (importedObject) => {
          filter(
            components,
            ({
              name,
              formData,
              color,
              position,
              types,
              type,
              optionValue,
              formDefaultValues,
            }) => {
              if (importedObject.name === name) {
                addCustomRectangle(
                  color,
                  name,
                  position,
                  types,
                  type,
                  optionValue,
                  formData,
                  formDefaultValues
                )
              }
            }
          )
        })
      })
    )
  }, [])

  async function addCustomRectangle(
    color,
    name,
    position,
    types,
    type,
    optionValue,
    formData,
    formDefaultValues
  ) {
    const lastId = getLastElementId(drawedObjects)
    dispatch(
      addObject(
        lastId,
        position,
        type,
        name,
        color,
        types,
        optionValue,
        formData,
        formDefaultValues
      )
    )
    await dispatch(handleButtons(position, name))
    checkIfFinished(name)
    dispatch(closeMenu())
    dispatch(hideBubbleMenu())
  }

  function checkIfFinished(name) {
    if (name === "GenerateOutput") {
      dispatch(show("orderFinishedModal"))
    }
  }

  return (
    <div style={{ width: drawedObjects[0].xValue + 200 }} className='App'>
      <OrderFinishedModal />
      <div
        style={{ left: xPosition, top: yPosition }}
        className='shapes-bubble'
      >
        {map(
          components,
          ({
            disabled,
            color,
            name,
            position,
            types,
            type,
            optionValue,
            formData,
            formDefaultValues,
          }) => {
            return (
              position && ( // mozna jen undefined
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
                        optionValue,
                        formData,
                        formDefaultValues
                      )
                    }
                  >
                    <div className='shapes-tooltip'>{name}</div>
                    <img src={require(`./assets/${name}.svg`)} />
                  </button>
                </div>
              )
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
