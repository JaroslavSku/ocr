import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateObjectOptions } from "../actions/drawedObjectsActions"
import { filter, find } from "lodash"

export default function SideMenu({ closeNav }) {
  const { types, header, navWidth, id } = useSelector(
    (state) => state.menu.sideMenu
  )

  const selectedShape = useSelector((state) =>
    find(state.draw[0].shapes, (shape) => shape.id === id)
  )
  console.log("This is the defaultValue of the side menu", selectedShape)
  useEffect(() => {
    if (selectedShape) {
      const { optionValue } = selectedShape
      setSelectValue(optionValue)
    }
  }, [selectedShape])

  const [selectValue, setSelectValue] = useState(null)

  const dispatch = useDispatch()

  function saveOptionValue(e) {
    const value = e.target.value
    console.log("sidemenu", id, value)
    dispatch(updateObjectOptions(id, value))
    setSelectValue(value)
    console.log("sidemenu", id, value)
  }
  return (
    <div style={{ width: navWidth }} id='mySidenav' className='sidenav'>
      <a className='closebtn' onClick={closeNav}>
        &times;
      </a>
      <div>
        <h2 className='sidenav-menu'>{header}</h2>
      </div>
      <div className='sidenav-body'>
        <label for='types'>Vyberte vlastnosti</label>
        <select
          onChange={(event) => saveOptionValue(event)}
          value={selectValue}
          id='types'
          name='carlist'
          form='carform'
        >
          {types ? (
            types.map((type, id) => {
              return (
                <option key={id} value={type}>
                  {type}
                </option>
              )
            })
          ) : (
            <option value='Žádné vlastnosti k výběru'>Bez vlastností</option>
          )}
        </select>
      </div>
    </div>
  )
}
