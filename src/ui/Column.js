import React from "react";
import EditableLabel from 'react-inline-editing'
import { Droppable, Draggable } from "react-beautiful-dnd";

import { TaskCard } from "./TaskCard";

export const Column = (props) => {
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
    const updatedColumn = props.column
    updatedColumn.title = text
    const updatedBoard = Array.from(props.board)
    const foundIndex = updatedBoard.findIndex(col => col.columnId == updatedColumn.columnId)
    updatedBoard[foundIndex] = updatedColumn
    
    props.updateBoard(updatedBoard)
  }

  return (
    <Draggable draggableId={props.column.columnId} index={props.index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="column box">
            <div className="card-header">
              <div className="card-header-title" {...provided.dragHandleProps}>
                <EditableLabel
                  text={props.column.title}
                  onFocusOut={handleFocusOut}
                >
                  {props.column.title}
                </EditableLabel>
              </div>
            </div>
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
  );
};
