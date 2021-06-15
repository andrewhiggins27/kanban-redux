import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faEdit,
  faTrash,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { EditTaskCardModal } from "./EditTaskCardModal";
import { DeleteTaskCardModal } from "./DeleteTaskCardModal";

export const TaskCard = (props) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const toggleExpand = () => {
    setOpen(!open);
  };

  const toggleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const toggleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const moveLeft = () => {
    if (props.columnOrder[0] === props.columnId) {
      return;
    } else {
      let newBoard = Array.from(props.board);
      let columnIndex = newBoard.findIndex(
        (col) => col.columnId === props.columnId
      );
      let cardIndex = newBoard[columnIndex].cards.indexOf(props.card);
      let columnOrderIndex = props.columnOrder.findIndex(
        (colId) => colId === props.columnId
      );
      let newColumnId = props.columnOrder[columnOrderIndex - 1];
      let newColumnIndex = newBoard.findIndex(
        (col) => col.columnId === newColumnId
      );
      newBoard[columnIndex].cards.splice(cardIndex, 1);
      newBoard[newColumnIndex].cards.push(props.card);
      props.updateBoard(newBoard);
    }
  };

  const moveRight = () => {
    if (props.columnOrder[props.columnOrder.length - 1] === props.columnId) {
      return;
    } else {
      let newBoard = Array.from(props.board);
      let columnIndex = newBoard.findIndex(
        (col) => col.columnId === props.columnId
      );
      let cardIndex = newBoard[columnIndex].cards.indexOf(props.card);
      let columnOrderIndex = props.columnOrder.findIndex(
        (colId) => colId === props.columnId
      );
      let newColumnId = props.columnOrder[columnOrderIndex + 1];
      let newColumnIndex = newBoard.findIndex(
        (col) => col.columnId === newColumnId
      );
      newBoard[columnIndex].cards.splice(cardIndex, 1);
      newBoard[newColumnIndex].cards.push(props.card);
      props.updateBoard(newBoard);
    }
  };

  let arrowLeftClasses =
    props.columnOrder[0] === props.columnId
      ? "button card-footer-item is-small deactive-button"
      : "button card-footer-item is-small";
  let arrowRightClasses =
    props.columnOrder[props.columnOrder.length - 1] === props.columnId
      ? "button card-footer-item is-small deactive-button"
      : "button card-footer-item is-small";

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
                  ? "taskcard-color taskcard card mb-1"
                  : "taskcard-default taskcard card mb-1"
              }
            >
              <div className="card-header">
                <p className="card-header-title taskcard-title">
                  {props.card.title}
                </p>
              </div>
              <div className="card-content">{description}</div>
              <footer className="card-footer">
                <button
                  className="button card-footer-item is-small"
                  onClick={toggleOpenEdit}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                </button>
                <button
                  className="button card-footer-item is-small"
                  onClick={toggleOpenDelete}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </button>
                <button className={arrowLeftClasses} onClick={moveLeft}>
                  <span className="icon">
                    <FontAwesomeIcon icon={faLongArrowAltLeft} />
                  </span>
                </button>
                <button className={arrowRightClasses} onClick={moveRight}>
                  <span className="icon">
                    <FontAwesomeIcon icon={faLongArrowAltRight} />
                  </span>
                </button>
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
