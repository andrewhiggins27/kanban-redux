import React from "react";

import { Draggable } from 'react-beautiful-dnd'

export const TaskCard = (props) => {
  return(
    <Draggable draggableId={props.card.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={(snapshot.isDragging ? "taskcard-color" : "taskcard-default")}>
            <div className="card">
              {props.card.title}
            </div>

          </div>
        </div>
      )}
    </Draggable>



  )
};
