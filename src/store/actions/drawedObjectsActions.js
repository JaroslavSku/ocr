import { updatePosition } from "./menuAction"

export const addObject = (
  lastId,
  position,
  objectType,
  name,
  color,
  types,
  optionValue
) => {
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
      optionValue,
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

export const deleteLastObject = (lastId) => {
  return (dispatch) => {
    if (lastId > 1) {
      dispatch(updatePosition(-500, -500))
      dispatch({
        type: "DELETE_OBJECT",
      })
    }
  }
}
