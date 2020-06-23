import axios from "axios"
import { filter, map } from "lodash"
export function sendJSON() {
  const drawedData = filter(
    JSON.parse(localStorage.getItem("drawedObjects"))[0].shapes,
    (shape) => {
      return shape.id !== undefined
    }
  )
  const sentData = map(drawedData, ({ name, x, formValues }, id) => {
    return {
      position: id,
      name,
      x,
      formValues,
    }
  })
  console.log(sentData)
  return (dispatch) => {
    axios.post(
      "https://run.mocky.io/v3/4a62d65d-d272-43ac-ad0e-5a070f4fb179",
      sentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}

export const acceptJSON = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://run.mocky.io/v3/3f590726-5e78-44d5-8b17-0befa268a827", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => resolve({ data }))
  })
}

export const saveFormRequirements = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://run.mocky.io/v3/4852c9b7-d018-4ad2-8011-c730d2470518", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        dispatch({
          type: "SAVE_FORMDATA",
          componentsFormData: data,
        })
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}