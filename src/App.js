import React from "react"
import "./App.css"
import "./scsss/styles.scss"
import Draw from "./Draw"
import { useSelector, useDispatch } from "react-redux"
import OrderFinishedModal from "./store/modals/OrderFinishedModal"
import BubbleMenu from "./store/menu/BubbleMenu"

function App() {
  const { xPosition, yPosition } = useSelector((state) => state.menu.bubbleMenu)

  const drawedObjects = useSelector((state) => state.draw)

  return (
    <div style={{ width: drawedObjects[0].xValue + 200 }} className='App'>
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
    </div>
  )
}

export default App
