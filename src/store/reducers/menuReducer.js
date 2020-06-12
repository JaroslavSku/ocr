const initialState = {
  bubbleMenu: { open: false, xPosition: -560, yPosition: -550 },
  sideMenu: {
    open: false,
    navWidth: 0,
    header: null,
    types: [],
    id: null,
  },
}

const menuReducer = (state = initialState, action) => {
  const { x, y, navWidth, header, types, id } = action
  switch (action.type) {
    case "UPDATE_POSITION":
      return {
        ...state,
        bubbleMenu: {
          xPosition: x,
          yPosition: y,
        },
      }
    case "OPEN_SIDENAV":
      return {
        ...state,
        sideMenu: {
          open: true,
          header,
          navWidth,
          types,
          id,
        },
      }
    case "CLOSE_SIDENAV":
      return {
        ...state,
        sideMenu: {
          open: false,
          navWidth: 0,
        },
      }

    default:
      return state
  }
}

export default menuReducer
