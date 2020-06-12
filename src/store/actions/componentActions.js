export function enableButton(positionId) {
  return (dispatch) => {
    dispatch({
      type: "ENABLE_BUTTON",
      id: positionId,
    })
  }
}

export function disableButton(positionId) {
  console.log("Action last id", positionId)
  return (dispatch) => {
    dispatch({
      type: "DISABLE_BUTTON",
      id: positionId,
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
  // if (name === "GenerateOutput") {
  //   disableAll()
  // }
  console.log("Handle button", name)
  return (dispatch) => {
    if (name === "GenerateOutput") {
      console.log("Disable all called")
      disableAll()
    }
    dispatch(enableButton(position))
  }
}
