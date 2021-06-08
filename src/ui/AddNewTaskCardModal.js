import React, { useState } from "react";

export const AddNewTaskCardModal = (props) => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState("")

  const clearForm = () => {
    setForm({title: "", description: ""})
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    let updatedColumn = props.column
    let updatedBoard = Array.from(props.board)
    let foundIndex = updatedBoard.findIndex(col =>  col.columnId === updatedColumn.columnId )

    if (form.title !== "" && form.description !== "") {
      let newCard = {...form, id: Math.floor(Math.random() * 1000).toString()}
      updatedColumn.cards.push(newCard)
      updatedBoard[foundIndex] = updatedColumn
      props.updateBoard(updatedBoard)
      clearForm()
      setErrors("")
      props.toggleModal()
    } else { 
      setErrors("Title and Description are Required")
    }
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
            Add New Card to {props.column.title} Column
          </h1>
          <h2 className="title is-6 error">
            {errors}
          </h2>
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
              <button className="button is-link" onClick={handleSubmit}>Add Card</button>
            </div>
            <div className="control">
              <button className="button is-link is-light" onClick={props.toggleModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        onClick={props.toggleModal}
      ></button>
    </div>
  );
};
