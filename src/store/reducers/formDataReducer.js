const initialState = {
  formDataLoaded: false,
}

const formDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_FORMDATA":
      return {
        formDataLoaded: true,
      }

    default:
      return state
  }
}
export default formDataReducer
