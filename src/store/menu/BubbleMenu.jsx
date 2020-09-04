import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { map, filter, forEach } from "lodash"
import { show } from "redux-modal"
import getLastElementId from "../helpers/getLastId"
import { handleButtons } from "../actions/componentActions"
import { closeMenu, hideBubbleMenu } from "../actions/menuAction"
import { acceptJSON, saveFormRequirements } from "../actions/apiJSON"

export default function BubbleMenu() {
  const components = useSelector((state) => state.components)
  const drawedObjects = useSelector((state) => state.draw)
  const formDataLoaded = useSelector((state) => state.form.formDataLoaded)
  const dispatch = useDispatch()

  function checkIfFinished(name) {
    if (name === "GenerateOutput") {
      dispatch(show("orderFinishedModal"))
    }
  }

  async function addCustomRectangle(component) {
    const lastId = getLastElementId(drawedObjects)
    const {
      position,
      type: objectType,
      name,
      color,
      formData,
      formDefaultValues,
    } = component
    dispatch({
      type: "ADD_OBJECT",
      lastId,
      position,
      objectType,
      name,
      color,
      formData,
      formDefaultValues,
    })
    await dispatch(handleButtons(position, name))
    checkIfFinished(name)
    dispatch(closeMenu())
    dispatch(hideBubbleMenu())
  }

  useEffect(() => {
    if (formDataLoaded) {
      dispatch(acceptJSON()).then(({ data: { objects } }) => {
        forEach(objects, (importedObject) => {
          filter(components, (component) => {
            if (importedObject.name === component.name) {
              addCustomRectangle(component)
            }
          })
        })
      })
    }
  }, [formDataLoaded])

  return (
    <>
      {map(components, (component) => {
        return (
          component.position && (
            <div>
              <button
                className='shapes-button'
                disabled={component.disabled}
                onClick={() => addCustomRectangle(component)}
              >
                <div className='shapes-tooltip'>{component.name}</div>
                <img src={require(`../../assets/${component.name}.svg`)} />
              </button>
            </div>
          )
        )
      })}
    </>
  )
}
