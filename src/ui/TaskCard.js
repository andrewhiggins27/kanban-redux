import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { EditTaskCardModal } from "./EditTaskCardModal";
import { DeleteTaskCardModal } from "./DeleteTaskCardModal";

export const TaskCard = (props) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const toggleExpand = () => {
    setOpen(!open);
  };

  const toggleOpenEdit = () => {
    setOpenEdit(!openEdit)
  }

  const toggleOpenDelete = () => {
    setOpenDelete(!openDelete)
  }

  const MAX_LENGTH = 120;

  let description =
    props.card.description.length < MAX_LENGTH ? (
      <p className="">{props.card.description}</p>
    ) : (
      <p className="">
        {props.card.description.substring(0, MAX_LENGTH)}...
        <button
          className="button is-pulled-right is-small"
          onClick={toggleExpand}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </p>
    );

  if (open) {
    description = (
      <p className="">
        {props.card.description}
        <button
          className="button is-pulled-right is-small"
          onClick={toggleExpand}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faAngleUp} />
          </span>
        </button>
      </p>
    );
  }

  return (
    <>
    <Draggable draggableId={props.card.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={
              snapshot.isDragging
                ? "taskcard-color card mb-1"
                : "taskcard-default card mb-1"
            }
          >
            <div className="card-header">
              <p className="card-header-title taskcard-title">
                {props.card.title}
              </p>
            </div>
            <div className="card-content">{description}</div>
            <footer className="card-footer">
              <a className="card-footer-item" onClick={toggleOpenEdit}>
                Edit
              </a>
              <a className="card-footer-item" onClick={toggleOpenDelete}>
                Delete
              </a>
              <a className="card-footer-item">
                Move Left
              </a>  
              <a className="card-footer-item">
                Move Right
              </a>
            </footer>
          </div>
        </div>
      )}
    </Draggable>
    <EditTaskCardModal
        isActive={openEdit}
        toggleOpenEdit={toggleOpenEdit}
        card={props.card}
        columnId={props.columnId}
        board={props.board}
        updateBoard={props.updateBoard}
      />
      <DeleteTaskCardModal
        isActive={openDelete}
        toggleOpenDelete={toggleOpenDelete}
        columnId={props.columnId}
        card={props.card}
        board={props.board}
        updateBoard={props.updateBoard}
      />
    </>
  );
};
