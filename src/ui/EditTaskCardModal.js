import React, { useState, useEffect } from "react";

export const EditTaskCardModal = (props) => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    setForm({
      title: props.card.title,
      description: props.card.description
    })
  },[])

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    let newBoard = Array.from(props.board)
    let columnIndex = newBoard.findIndex((col) => col.columnId === props.columnId)
    let newColumn = newBoard[columnIndex]
    let cardIndex = newColumn.cards.findIndex((card) => card.id === props.card.id)

    newColumn.cards[cardIndex] = {...form, id: props.card.id}
    newBoard[columnIndex] = newColumn

    props.updateBoard(newBoard)
    props.toggleOpenEdit()
  }

  let modalClass = "modal";
  if (props.isActive) {
    modalClass += " is-active";
  }

  return (
    <div className={modalClass}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-4">
            Edit Card 
          </h1>
          <h2 className="title is-6 error">{errors}</h2>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                type="textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Add Card
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
                onClick={props.toggleOpenEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        onClick={props.toggleOpenEdit}
      ></button>
    </div>
  );
};
