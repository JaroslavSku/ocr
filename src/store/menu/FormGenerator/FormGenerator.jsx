import React from "react"
import { map, find } from "lodash"
import { updateObjectOptions } from "../../actions/drawedObjectsActions"
import { useDispatch, useSelector } from "react-redux"

export default function FormGenerator({ formData, formValues, objectId }) {
  const dispatch = useDispatch()
  function submitForm(e) {
    const { id: inputName, value } = e.target
    const id = objectId
    dispatch(updateObjectOptions(id, value, inputName))
  }

  return (
    <div>
      <form className='form' onChange={submitForm}>
        {map(Object.entries(formData), ([key, value]) => {
          console.log("Key and value", key, value)
          if (value.type === "Select") {
            const { options } = value || {}

            return (
              <div className='form-select'>
                <label className='form-label' for={key}>
                  {key}
                </label>
                <select
                  className='form-select__input'
                  value={formValues[key]}
                  id={key}
                >
                  <option value='choose'>-- Select --</option>(
                  {map(options, (optionValue) => {
                    return <option value={optionValue}>{optionValue}</option>
                  })}
                  )
                </select>
              </div>
            )
          } else {
            return (
              <div className='form-input'>
                <label className='form-label' for={key}>
                  {key}
                </label>
                <input
                  value={formValues[key]}
                  type={value}
                  id={key}
                  name={key}
                  maxlength='15'
                />
              </div>
            )
          }
        })}
      </form>
    </div>
  )
}
