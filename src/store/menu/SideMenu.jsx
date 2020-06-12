import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateObjectOptions } from "../actions/drawedObjectsActions"

export default function SideMenu({ closeNav }) {
  const { types, header, navWidth, id } = useSelector(
    (state) => state.menu.sideMenu
  )

  const dispatch = useDispatch()

  function saveOptionValue(e) {
    const value = e.target.value
    console.log("sidemenu", id, value)
    // dispatch(updateObjectOptions(id, value))
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
