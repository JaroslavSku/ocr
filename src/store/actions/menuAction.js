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
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_POSITION",
      x,
      y,
    })
  }
}
