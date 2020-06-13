import React from "react"
import { connectModal, hide } from "redux-modal"
import { useDispatch } from "react-redux"

function OrderFinishedModal() {
  const dispatch = useDispatch()
  function finisheOrder() {
    dispatch(hide("orderFinishedModal"))
  }
  return (
    <div>
      <h2>Přejete si ukončit Vaši objednávku?</h2>
      <button onClick={finisheOrder} type='submit'>
        OK
      </button>
    </div>
  )
}

export default connectModal({ name: "orderFinishedModal" })(OrderFinishedModal)
