import React from "react"
import { connectModal, hide } from "redux-modal"
import { useDispatch } from "react-redux"
import { sendJSON } from "../actions/apiJSON"

function OrderFinishedModal() {
  const dispatch = useDispatch()
  function finisheOrder() {
    dispatch(hide("orderFinishedModal"))
    dispatch(sendJSON())
  }
  return (
    <div className='modal'>
      <div className='modal-body'>
        <h2>Přejete si odeslat data?</h2>
        <button onClick={finisheOrder} type='submit'>
          OK
        </button>
        <button onClick={finisheOrder} type='submit'>
          CANCEL
        </button>
      </div>
    </div>
  )
}

export default connectModal({ name: "orderFinishedModal" })(OrderFinishedModal)
