// export function updatePosition(x, y) {
//   //   console.log("These are menu action val", x, y)
//   return {
//     type: "UPDATE_POSITION",
//     x,
//     y,
//   }
// }

export function updatePosition(x, y) {
  console.log("These are menu action val", x, y)
  return (dispatch) => {
    dispatch({
      type: "UPDATE_POSITION",
      x,
      y,
    })
  }
}

export function openMenu(header, navWidth, types, id) {
  console.log("Opene side nav id", id)
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
