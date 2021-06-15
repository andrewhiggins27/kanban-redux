import React from "react";
import COLUMN_COLORS from "../constants/columnColors"

export const NewColumnButton = (props) => {
  const addNewColumn = () => {
    let idString = props.globalCount.toString();
    props.addNewId(idString);
    let randomColor = COLUMN_COLORS[Math.floor(Math.random() * COLUMN_COLORS.length)]

    props.updateBoard([
      ...props.board,
      {
        columnId: idString,
        title: "Click text to change",
        cards: [],
        color: randomColor
      },
    ]);
    props.globalIncrement();
  };

  return (
    <div className="button is-rounded" data-tooltip="something" onClick={addNewColumn}>
      <span>
        Add Column
      </span>
    </div>
  );
};
