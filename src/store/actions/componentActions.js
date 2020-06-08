export function enableButton(requiredFor) {
  return (dispatch) => {
    dispatch({
      type: "ENABLE_BUTTON",
      requiredFor,
    })
  }
}
