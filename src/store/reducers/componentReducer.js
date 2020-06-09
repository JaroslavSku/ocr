import { act } from "react-dom/test-utils"
import { forEach } from "lodash"
const initialState = [
  {
    id: 1,
    position: 1,
    prerequisite: 0,
    name: "Unzip",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 2,
    position: 2,
    prerequisite: 0,
    name: "ChooseParser",
    color: "darkgrey",
    types: ["XML", "XLS", "Text", "PDF"],
    disabled: false,
  },
  {
    id: 3,
    position: 3,
    prerequisite: 2,
    name: "GenerateXML",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 4,
    position: 4,
    prerequisite: 3,
    name: "DetectFileTypes",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 5,
    position: 5,
    prerequisite: 4,
    name: "SplitXMLs",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 6,
    position: 6,
    prerequisite: 4,
    name: "MineData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 7,
    position: 7,
    prerequisite: 5,
    name: "MergeMinedData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 8,
    position: 8,
    prerequisite: 6,
    name: "AddMetadata",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 9,
    position: 9,
    prerequisite: 8,
    name: "Validations",
    color: "shadow",
    disabled: true,
  },
  {
    id: 10,
    position: 10,
    prerequisite: 6,
    name: "ModifyData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 11,
    position: 11,
    prerequisite: 0,
    name: "GenerateOutput",
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
