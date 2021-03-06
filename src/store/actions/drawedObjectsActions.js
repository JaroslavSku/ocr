import { hideBubbleMenu } from "./menuAction"

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
      dispatch(hideBubbleMenu())
      dispatch({
        type: "DELETE_OBJECT",
      })
    }
  }
}
