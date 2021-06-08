import React from 'react'

export const NewColumnButton = (props) => {
  const addNewColumn = () => {
    let idString = props.globalCount.toString()
    props.addNewId(idString)

    props.updateBoard([
      ...props.board, {
        columnId: idString,
        title: "Click text to change title",
        cards: []
      }
    ])
    props.globalIncrement()
  }

  return (
    <div className="button is-rounded" onClick={addNewColumn}>
    <span className="icon">
      +
    </span>
    </div>
  )
}
