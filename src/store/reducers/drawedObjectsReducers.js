import { bindActionCreators } from "redux"
import { arrowLine, generateShapes } from "../../shapes"
import { findKey, find, findIndex } from "lodash"

const initialState = [
  {
    node: 0,
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
  const {
    position,
    objectType,
    name,
    color,
    types,
    lastId,
    optionValue,
    objectId,
  } = action
  const { xValue, yValue } = state[initialNode]
  const id = lastId + 1
  let newX2 = null
  let newXwithWidth = null
  let newShapes = []

  switch (action.type) {
    case "ADD_OBJECT":
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
          optionValue
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
      const index = findIndex(state[initialNode].shapes, ["id", objectId])
      console.log(index, state[initialNode].shapes[index])
      let newItems = [...state[initialNode].shapes]
      newItems[index]["optionValue"] = optionValue
      // const newObject = {
      //   ...state[initialNode].shapes[index],
      //   optionValue
      // }

      // const newShapes =[
      //   ...state[initialNode].shapes,
      // ]

      console.log("This is the key", index, newItems)
      return {
        ...state,
        [initialNode]: {
          ...state[initialNode],
          shapes: newItems,
        },
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
