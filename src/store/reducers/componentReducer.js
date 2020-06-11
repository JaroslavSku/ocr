import { act } from "react-dom/test-utils"
import { forEach } from "lodash"
const initialState = [
  {
    id: 1,
    position: 1,
    prerequisite: 0,
    type: "rect",
    name: "Unzip",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 2,
    position: 2,
    prerequisite: 0,
    type: "rect",
    name: "ChooseParser",
    color: "darkgrey",
    types: ["XML", "XLS", "Text", "PDF"],
    disabled: false,
  },
  {
    id: 3,
    position: 3,
    prerequisite: 2,
    type: "rect",
    name: "GenerateXML",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 4,
    position: 4,
    prerequisite: 3,
    type: "rect",
    name: "DetectFileTypes",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 5,
    position: 5,
    prerequisite: 4,
    type: "rect",
    name: "SplitXMLs",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 6,
    position: 6,
    prerequisite: 4,
    type: "rect",
    name: "MineData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 7,
    position: 7,
    prerequisite: 5,
    type: "rect",
    name: "MergeMinedData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 8,
    position: 8,
    prerequisite: 6,
    type: "rect",
    name: "AddMetadata",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 9,
    position: 9,
    prerequisite: 8,
    type: "rect",
    name: "Validations",
    color: "shadow",
    disabled: true,
  },
  {
    id: 10,
    position: 10,
    prerequisite: 6,
    type: "rect",
    name: "ModifyData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 11,
    position: 11,
    prerequisite: 0,
    type: "circle",
    name: "GenerateOutput",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 12,
    position: 0,
    name: "IF",
    type: "IF",
    prerequisite: 0,
    color: "darkgrey",
    disabled: false,
  },
]

const componentReducer = (state = initialState, action) => {
  const { id } = action
  const components = state
  switch (action.type) {
    case "ENABLE_BUTTON":
      console.log("These are the components", components, id)
      //   Object.values(components).forEach((component) => {
      //     console.log(component)
      //   })
      forEach(components, (component) => {
        if (component.prerequisite === id) {
          component.disabled = false
        }
      })
      console.log("These are the components", components)
      return {
        ...state,
        ...components,
      }
    case "DISABLE_BUTTON":
      forEach(components, (component) => {
        if (component.prerequisite >= id) {
          component.disabled = true
        }
      })
      return {
        ...state,
        ...components,
      }
    default:
      return state
  }
}

export default componentReducer
