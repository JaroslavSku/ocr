import React from "react"
import { useSelector } from "react-redux"

export default function SideMenu({ closeNav }) {
  const { types, header, navWidth } = useSelector(
    (state) => state.menu.sideMenu
  )
  console.log("option types", types)
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
        <select id='types' name='carlist' form='carform'>
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
