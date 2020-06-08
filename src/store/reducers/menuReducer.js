const initialState = {
  display: "none",
  xPosition: -560,
  yPosition: -550,
}

const menuReducer = (state = initialState, action) => {
  const { x, y } = action
  switch (action.type) {
    case "UPDATE_POSITION":
      return {
        ...state,
        xPosition: x,
        yPosition: y,
      }

    default:
      return state
  }
}

export default menuReducer
