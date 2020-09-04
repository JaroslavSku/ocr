import React from "react"
import { useSelector } from "react-redux"

import { find } from "lodash"
import FormGenerator from "./FormGenerator/FormGenerator"

export default function SideMenu({ closeNav }) {
  const { header, navWidth, id } = useSelector((state) => state.menu.sideMenu)

  const { formData, formValues } =
    useSelector((state) =>
      find(state.draw[0].shapes, (shape) => shape.id === id)
    ) || {}
  console.log("Data in form generator", formData)
  if (formData) {
    return (
      <div style={{ width: navWidth }} id='mySidenav' className='sidenav'>
        <a className='closebtn' onClick={closeNav}>
          &times;
        </a>
        <div>
          <h2 className='sidenav-menu'>{header}</h2>
        </div>
        <div className='sidenav-body'>
          {formData && (
            <FormGenerator
              objectId={id}
              formValues={formValues}
              formData={formData}
            />
          )}
        </div>
      </div>
    )
  }
  return null
}
