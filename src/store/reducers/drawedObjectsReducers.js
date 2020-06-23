import { arrowLine, generateShapes } from "../../shapes"
import { findIndex } from "lodash"
import getLastElementId from "../helpers/getLastId"

const initialState = [
  {
    node: 0,
    formDataLoaded: false,
    xValue: 110,
    yValue: 200,
    shapes: [
      {
        id: 1,
        position: 1,
        type: "circle",
        x: 50,
        y: 200,
        width: 100,
        height: 100,
        fill: "black",
        name: "Start",
      },
    ],
  },
]

const drawedObjectsReducer = (state = initialState, action) => {
  const initialNode = 0
  const { xValue, yValue } = state[initialNode]
  const id = getLastElementId(state) + 1
  let newX2 = null
  let newXwithWidth = null
  let newShapes = []
  localStorage.setItem("drawedObjects", JSON.stringify(state))
  switch (action.type) {
    case "ADD_OBJECT":
      const {
        position,
        objectType,
        name,
        color,
        types,
        formData,
        formValues,
      } = action
      newX2 = xValue + 100
      newXwithWidth = newX2 + 100
      newShapes = [
        ...state[initialNode].shapes,
        arrowLine(xValue, newX2, yValue, position),
        generateShapes(
          position,
          objectType,
          newX2,
          yValue,
          name,
          color,
          name,
          types,
          id,
          formData,
          formValues
        ),
      ]
      return {
        ...state,
        [initialNode]: {
          ...state[initialNode],
          xValue: newXwithWidth,
          shapes: newShapes,
        },
      }

    case "SAVE_OPTION":
      const { objectId, inputName, optionValue } = action
      const index = findIndex(state[initialNode].shapes, ["id", objectId])
      let newState = state
      newState[initialNode].shapes[index]["formValues"][inputName] = optionValue
      // newState[initialNode]["new"] = "bla"
      console.log(newState)
      return {
        ...state,
        ...newState,
      }

    case "DELETE_OBJECT":
      newShapes = state[initialNode].shapes.slice(0, -2)
      newXwithWidth = state[initialNode].xValue - 200

      return {
        ...state,
        [initialNode]: {
          ...state[initialNode],
          xValue: newXwithWidth,
          shapes: newShapes,
        },
      }

    default:
      return state
  }
}

export default drawedObjectsReducer
