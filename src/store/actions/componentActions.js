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
