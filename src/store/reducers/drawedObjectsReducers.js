import { bindActionCreators } from "redux"
import { arrowLine, generateShapes } from "../../shapes"
import { find } from "lodash"

const initialState = [
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
  } = action
  const { xValue, yValue } = state[initialNode]
  const id = lastId + 1
  let newX2 = null
  let newXwithWidth = null
  let newShapes = []
  let shape = null
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
          id
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
      shape = find(...state[initialNode].shapes, ["id", id])

      return {
        ...state,
        [initialNode]: {
          ...state[initialNode],
          shapes: {
            ...state[initialNode].shapes,
            [id]: {
              ...state[initialNode].shapes[id],
              optionValue,
            },
          },
        },
      }

    default:
      return state
  }
}

export default drawedObjectsReducer
