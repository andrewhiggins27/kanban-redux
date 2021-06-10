import React from 'react'

export const DeleteColumnModal = (props) => {
  let modalClass = "modal";
  if (props.isActive) {
    modalClass += " is-active";
  }

  const submitDelete = () => {
    let newBoard = Array.from(props.board)
    let columnIndex = newBoard.findIndex(col => col.columnId === props.column.columnId)
    newBoard.splice(columnIndex, 1)
    props.removeId(props.column.columnId)
    props.updateBoard(newBoard)
  }

  return (
    <div>
      <div className={modalClass}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-4">
            Delete Column?
          </h1>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={submitDelete}>
                Confirm
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
                onClick={props.toggleModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        onClick={props.toggleModal}
      ></button>
    </div>
    </div>
  )
}
