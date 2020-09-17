import React, { useEffect } from "react"
import "./App.css"
import "./scsss/styles.scss"
import Draw from "./Draw"
import { useSelector, useDispatch } from "react-redux"
import OrderFinishedModal from "./store/modals/OrderFinishedModal"
import BubbleMenu from "./store/menu/BubbleMenu"
import { saveFormRequirements } from "./store/actions/apiJSON"

function App() {
  const { xPosition, yPosition } = useSelector((state) => state.menu.bubbleMenu)
  const dispatch = useDispatch()
  const drawedObjects = useSelector((state) => state.draw)

  useEffect(() => {
    dispatch(saveFormRequirements())
  }, [])

  return (
    <>
      <OrderFinishedModal />
      <div
        style={{ left: xPosition, top: yPosition }}
        className='shapes-bubble'
      >
        <BubbleMenu />
      </div>
      <div className='shapes-drawings'>
        <Draw drawedObjects={drawedObjects} node={0} />
      </div>
    </>
  )
}

export default App
