import { act } from "react-dom/test-utils"
import { foreach } from "lodash"
const initialState = [
  {
    id: 1,
    position: 1,
    requiredFor: 0,
    name: "Unzip",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 2,
    position: 2,
    requiredFor: 0,
    name: "ChooseParser",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 3,
    position: 3,
    requiredFor: 2,
    name: "GenerateXML",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 4,
    position: 4,
    requiredFor: 3,
    name: "DetectFileTypes",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 5,
    position: 5,
    requiredFor: 4,
    name: "SplitXMLs",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 6,
    position: 6,
    requiredFor: 4,
    name: "MineData",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 7,
    position: 7,
    requiredFor: 5,
    name: "MergeMinedData",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 8,
    position: 8,
    requiredFor: 6,
    name: "AddMetadata",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 9,
    position: 9,
    requiredFor: 8,
    name: "Validations",
    color: "shadow",
    disabled: false,
  },
  {
    id: 10,
    position: 10,
    requiredFor: 6,
    name: "ModifyData",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 11,
    position: 11,
    requiredFor: 0,
    name: "GenerateOutput",
    color: "darkgrey",
    disabled: false,
  },
]

const componentReducer = (state = initialState, action) => {
  const { requiredFor } = action
  const components = { ...state }
  switch (action.type) {
    case "ENABLE_BUTTON":
      foreach(components, (component) => {
        if (component.position === requiredFor) {
          component.disabled = false
        }
      })
      return {
        ...state,
        components,
      }

    default:
      return state
  }
}

export default componentReducer
