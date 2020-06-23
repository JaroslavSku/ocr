import { updatePosition } from "./menuAction"

export const addObject = (
  lastId,
  position,
  objectType,
  name,
  color,
  types,
  optionValue,
  formData,
  formDefaultValues
) => {
  console.log("these are form default values", formDefaultValues)
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
      formData,
      formValues: formDefaultValues,
    })
  }
}

export const updateObjectOptions = (id, value, inputName) => {
  const optionValue = value
  const objectId = id
  return (dispatch) => {
    dispatch({
      type: "SAVE_OPTION",
      optionValue,
      objectId,
      inputName,
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
