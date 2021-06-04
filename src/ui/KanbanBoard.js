import React, { useState } from "react";
import { Column } from "./Column";
import { NewColumnButton } from "./NewColumnButton";

export const KanbanBoard = (props) => {
  const [columnOrder, setColumnOrder] = useState(["1", "2", "3"]);
  const [board, setBoard] = useState([
    {
      columnId: "1",
      title: "To-Do",
      cards: [
        {
          id: "44",
          title: "Make a trello board",
          description: "We need to make a Camden, NJ board",
          due_date: Date.now(),
        },
        {
          id: "33",
          title: "Make a trello board2222",
          description: "We need to make a Camden, NJ board2222",
          due_date: Date.now(),
        },
      ],
    },
    {
      columnId: "2",
      title: "In Progress",
      cards: [
        {
          id: "22",
          title: "Make a trello board inprogress",
          description: "We need to make a Camden, NJ board inprogress",
          due_date: Date.now(),
        },
        {
          id: "11",
          title: "Make a trello board inprogress33333",
          description: "We need to make a Camden, NJ board inprogress3333",
          due_date: Date.now(),
        },
      ],
    },
    {
      columnId: "3",
      title: "Done",
      cards: [],
    },
  ]);

  const updateBoard = (newBoard) => {
    setBoard(newBoard)
  }

  const addNewId = (Id) => {
    setColumnOrder([...columnOrder, Id]);
  };

  const removeId = (Id) => {
    setColumnOrder(columnOrder.filter((columnId) => columnId != Id ))
  }

  const mappedColumns = columnOrder.map((columnId, index) => {
    const column = board.find((column) => column.columnId === columnId);

    return (
      <Column
        column={column}
        columnId={column.columnId}
        index={index}
        key={index}
      />
    );
  });

  return (
    <div>
      <div className="columns">{mappedColumns}</div>
      <NewColumnButton
        addNewId={addNewId}
        updateBoard={updateBoard}
        globalCount={props.globalCount}
        globalIncrement={props.globalIncrement}
        board={board}
      />
    </div>
  );
};
