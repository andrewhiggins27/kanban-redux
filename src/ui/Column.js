import React, {useState} from "react";
import EditableLabel from "react-inline-editing";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TaskCard } from "./TaskCard";
import { AddNewTaskCardModal } from "./AddNewTaskCardModal"

export const Column = (props) => {
  const [openModal, setOpenModal] = useState(false)

  const toggleModal = () => {setOpenModal(!openModal)}

  const mappedCards = props.column.cards.map((card, index) => {
    return (
      <TaskCard
        key={card.title}
        card={card}
        index={index}
        columnId={props.column.columnId}
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

  return (
    <>
    <Draggable draggableId={props.column.columnId} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="column is-one-quarter"
        >
          <div className="card">
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
              <button className="button is-small card-header-icon" onClick={toggleModal}>
                <span className="icon">
                  <FontAwesomeIcon icon={faPlusSquare} />
                </span>
              </button>
            </header>
            <Droppable droppableId={props.column.columnId} type="card">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={
                    snapshot.isDraggingOver ? "columnColored" : "columnDefault"
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
      isActive={openModal}
      toggleModal={toggleModal}
      column={props.column}
      updateBoard={props.updateBoard}
      board={props.board}
    />
    </>
  );
};
