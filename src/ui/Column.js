import React from "react";
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

  return (
    <div className="column box">
      <div className="card-header">
        <div className="card-header-title">{props.column.title}</div>
      </div>
      {mappedCards}
    </div>
  );
};
