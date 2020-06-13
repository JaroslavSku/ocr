import { findIndex } from "lodash"

export const addObject = (lastId, position, objectType, name, color, types) => {
  console.log("some data", lastId, position, objectType, name, color)
  return (dispatch) => {
    dispatch({
      type: "ADD_OBJECT",
      lastId,
      position,
      objectType,
      name,
      color,
      types,
    })
  }
}

export const updateObjectOptions = (id, value) => {
  console.log("update obj data", id, value)
  const optionValue = value
  const objectId = id
  return (dispatch) => {
    dispatch({
      type: "SAVE_OPTION",
      optionValue,
      objectId,
    })
  }
}
