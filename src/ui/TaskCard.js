import React, { useState } from "react";

import EditableLabel from "react-inline-editing";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export const TaskCard = (props) => {
  const [open, setOpen] = useState(false);

  const toggleExpand = () => {
    setOpen(!open);
  };

  const MAX_LENGTH = 120;

  let description =
    props.card.description.length < MAX_LENGTH ? (
      <p className="">{props.card.description}</p>
    ) : (
      <p className="">
        {props.card.description.substring(0, MAX_LENGTH)}...
        <button className="button is-pulled-right is-small" onClick={toggleExpand}>
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
        <button className="button is-pulled-right is-small" onClick={toggleExpand}>
          <span className="icon">
            <FontAwesomeIcon icon={faAngleUp}/>
          </span>
        </button>
      </p>
    );
  }

  return (
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
          </div>
        </div>
      )}
    </Draggable>
  );
};
