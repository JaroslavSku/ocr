export function updatePosition(x, y) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_POSITION",
      x,
      y,
    })
  }
}

export function openMenu(header, navWidth, types, id) {
  return (dispatch) => {
    dispatch({
      type: "OPEN_SIDENAV",
      header,
      types,
      navWidth,
      id,
    })
  }
}

export function closeMenu() {
  return (dispatch) => {
    dispatch({
      type: "CLOSE_SIDENAV",
    })
  }
}

export function formDataLoaded() {
  return (dispatch) => {
    dispatch({
      type: "FORMDATA_LOADED",
    })
  }
}

export function hideBubbleMenu() {
  return (dispatch) => {
    dispatch({
      type: "HIDE_BUBBLEMENU",
    })
  }
}
