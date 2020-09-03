import { hideBubbleMenu } from "./menuAction"

export function enableButton(positionId, name) {
  return (dispatch) => {
    dispatch({
      type: "ENABLE_BUTTON",
      id: positionId,
      name,
    })
  }
}

export function disableButton(positionId, name) {
  return (dispatch) => {
    dispatch({
      type: "DISABLE_BUTTON",
      id: positionId,
      name,
    })
  }
}

export function disableAll() {
  return (dispatch) => {
    dispatch({
      type: "DISABLE_ALL",
    })
  }
}

export function handleButtons(position, name) {
  return (dispatch) => {
    if (name === "GenerateOutput") {
      dispatch(hideBubbleMenu())
      dispatch(disableAll())
    }
    if (name !== "IF" && name !== "GenerateOutput") {
      dispatch(enableButton(position, name))
    }
  }
}
