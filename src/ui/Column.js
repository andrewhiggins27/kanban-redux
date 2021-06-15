import React, {useState} from "react";
import EditableLabel from "react-inline-editing";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TaskCard } from "./TaskCard";
import { AddNewTaskCardModal } from "./AddNewTaskCardModal"
import { DeleteColumnModal } from "./DeleteColumnModal";

export const Column = (props) => {
  const [openCardModal, setCardModal] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)

  const toggleCardModal = () => {setCardModal(!openCardModal)}
  const toggleDeleteModal = () => {setDeleteModal(!openDeleteModal)}

  const mappedCards = props.column.cards.map((card, index) => {
    return (
      <TaskCard
        key={card.title}
        card={card}
        index={index}
        columnId={props.column.columnId}
        columnOrder={props.columnOrder}
        updateBoard={props.updateBoard}
        board={props.board}
      />
    );
  });

  const handleFocusOut = (text) => {
    const updatedColumn = props.column;
    updatedColumn.title = text;
    const updatedBoard = Array.from(props.board);
    const foundIndex = updatedBoard.findIndex(
      (col) => col.columnId === updatedColumn.columnId
    );
    updatedBoard[foundIndex] = updatedColumn;

    props.updateBoard(updatedBoard);
  };

  let lastColumn
  if (props.column.columnId === props.columnOrder[props.columnOrder.length - 1]) {
    lastColumn = "lastColumn"
  }

  return (
    <>
    <Draggable draggableId={props.column.columnId} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="column is-one-quarter"
          id={lastColumn}
        >
          <div className="card column-card" style={{
            backgroundColor: props.column.color
          }}>
            <header className="card-header">
              <div
                className="card-header-title column-title mb-2"
                {...provided.dragHandleProps}
              >
                <EditableLabel
                  text={props.column.title}
                  onFocusOut={handleFocusOut}
                  className="input"
                >
                  {props.column.title}
                </EditableLabel>
              </div>
              <button className="button is-small card-header-icon column-header-icon" onClick={toggleCardModal}>
                <span className="icon">
                  <FontAwesomeIcon icon={faPlusSquare} />
                </span>
              </button>
              <button className="button is-small card-header-icon column-header-icon" onClick={toggleDeleteModal}>
                <span className="icon">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </button>
            </header>
            <Droppable droppableId={props.column.columnId} type="card">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={
                    snapshot.isDraggingOver ? "columnColored column-card" : "column-card"
                  }
                >
                  {mappedCards}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
    <AddNewTaskCardModal
      isActive={openCardModal}
      toggleModal={toggleCardModal}
      column={props.column}
      updateBoard={props.updateBoard}
      board={props.board}
    />
    <DeleteColumnModal
      board={props.board}
      updateBoard={props.updateBoard}
      column={props.column}
      isActive={openDeleteModal}
      toggleModal={toggleDeleteModal}
      removeId={props.removeId}
    />
    </>
  );
};
