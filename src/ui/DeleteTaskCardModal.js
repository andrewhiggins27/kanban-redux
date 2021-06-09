import React from 'react'

export const DeleteTaskCardModal = (props) => {
  let modalClass = "modal";
  if (props.isActive) {
    modalClass += " is-active";
  }

  const submitDelete = (e) => {
    let newBoard = Array.from(props.board)
    let columnIndex = newBoard.findIndex((col) => col.columnId === props.columnId)
    let newCards = newBoard[columnIndex].cards.filter((card) => card.id !== props.card.id)
    newBoard[columnIndex].cards = newCards
    props.updateBoard(newBoard)
    props.toggleOpenDelete()
  }
  
  return (
    <div className={modalClass}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-4">
            Delete Card?
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
                onClick={props.toggleOpenDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        onClick={props.toggleOpenDelete}
      ></button>
    </div>
  )
}
