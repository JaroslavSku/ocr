import { forEach, find, isArray } from "lodash"

const initialState = [
  {
    id: 1,
    prerequisite: 0,
    type: "circle",
    name: "Start",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 2,
    position: 2,
    prerequisite: 0,
    type: "rect",
    name: "Unzip",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 3,
    position: 3,
    prerequisite: 0,
    type: "rect",
    name: "ChooseParser",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 4,
    position: 4,
    prerequisite: [3, 2],
    type: "rect",
    name: "GenerateXML",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 5,
    position: 5,
    prerequisite: 4,
    type: "rect",
    name: "DetectFileTypes",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 6,
    position: 6,
    prerequisite: 5,
    type: "rect",
    name: "SplitXMLs",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 7,
    position: 7,
    prerequisite: 5,
    type: "rect",
    name: "MineData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 8,
    position: 8,
    prerequisite: 7,
    type: "rect",
    name: "MergeMinedData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 9,
    position: 9,
    prerequisite: 8,
    type: "rect",
    name: "AddMetadata",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 10,
    position: 10,
    prerequisite: 9,
    type: "rect",
    name: "Validations",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 11,
    position: 11,
    prerequisite: 8,
    type: "rect",
    name: "ModifyData",
    color: "darkgrey",
    disabled: true,
  },
  {
    id: 12,
    position: 12,
    prerequisite: 0,
    type: "circle",
    name: "GenerateOutput",
    color: "darkgrey",
    disabled: false,
  },
  {
    id: 13,
    position: 13,
    name: "IF",
    type: "IF",
    prerequisite: 0,
    color: "darkgrey",
    disabled: false,
  },
]

const componentReducer = (state = initialState, action) => {
  const { name = "" } = action
  const components = { ...state }
  switch (action.type) {
    case "ENABLE_BUTTON":
      const componentEnableID = find(
        components,
        (component) => component.name === name
      )
      forEach(components, (component) => {
        const { prerequisite } = component
        if (Array.isArray(prerequisite)) {
          forEach(prerequisite, (oneCondition) => {
            if (
              oneCondition <= componentEnableID.id &&
              component.id >= componentEnableID.id
            ) {
              component.disabled = false
            } else if (component.id < componentEnableID.id) {
              component.disabled = true
            }
          })
        } else {
          if (
            component.prerequisite <= componentEnableID.id &&
            component.id >= componentEnableID.id
          ) {
            component.disabled = false
          } else if (component.id < componentEnableID.id) {
            component.disabled = true
          }
        }
      })
      return {
        ...state,
        ...components,
      }
    case "DISABLE_BUTTON":
      const componentDisableId = find(
        components,
        (component) => component.name === name
      )
      forEach(components, (component) => {
        const { prerequisite } = component
        if (Array.isArray(prerequisite)) {
          forEach(prerequisite, (oneCondition) => {
            if (oneCondition > componentDisableId.id) {
              component.disabled = true
            } else if (
              component.id >= componentDisableId.id &&
              oneCondition <= componentDisableId.id
            ) {
              component.disabled = false
            }
          })
        } else {
          if (component.prerequisite > componentDisableId.id) {
            component.disabled = true
          } else if (
            component.id >= componentDisableId.id &&
            component.prerequisite <= componentDisableId.id
          ) {
            component.disabled = false
          }
        }
      })
      return {
        ...state,
        ...components,
      }
    case "SAVE_FORMDATA":
      const { componentsFormData } = action
      const newComponents = { ...state }
      forEach(newComponents, (component) => {
        forEach(componentsFormData, (componentFormData) => {
          if (component.name === componentFormData.name) {
            component["formData"] = componentFormData.schema
            component["formDefaultValues"] = componentFormData.formValues
          }
        })
      })
      return {
        ...state,
        ...newComponents,
      }
    default:
      return state
  }
}

export default componentReducer
