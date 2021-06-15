import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { Column } from "./Column";
import { NavBar } from "./NavBar";

export const KanbanBoard = (props) => {
  const [columnOrder, setColumnOrder] = useState(["1", "2", "3", "4"]);
  const [board, setBoard] = useState([
    {
      columnId: "1",
      title: "To-Do",
      cards: [
        {
          id: "44",
          title: "Spin in circles for 5 minutes",
          description:
            "Rotate for an extended period of time to prove dizziness is only a state of mind",
        },
        {
          id: "33",
          title: "Make a grilled cheese",
          description:
            "Substitute mayo for butter for an easy spread and an even toast",
        },
      ],
      color: "#D88A8A",
    },
    {
      columnId: "2",
      title: "In Progress",
      cards: [
        {
          id: "234",
          title: "Create a front-end only kanban board",
          description: "Persisting in the backend is for chumps",
        },
        {
          id: "1671",
          title: "Get Trello.com deleted from the internet",
          description: "There can be only one.",
        },
      ],
      color: "#F8EDD1",
    },
    {
      columnId: "3",
      title: "Click text to change",
      cards: [
        {
          id: "232422",
          title: "This text is editable using the buttons below this card",
          description:
            "You can also delete the card and pretend the task never existed",
        },
        {
          id: "77483",
          title: "Cards and columns can be rearranged by drag and dropping",
          description:
            "You may also use the arrow buttons below to move the Task Card to the next column",
        },
      ],
      color: "#EB7B59",
    },
    {
      columnId: "4",
      title: "Completed",
      cards: [
        {
          id: "882",
          title: "Dance like nobody's watching",
          description:
            "Even though they all are, and they're recording it to laugh at you later",
        },
      ],
      color: "#A7C5BD",
    },
  ]);

  useEffect(() => {
    if (columnOrder.length !== 4) {
      document
        .getElementById("lastColumn")
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [board]);

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
  };

  const addNewId = (Id) => {
    setColumnOrder([...columnOrder, Id]);
  };

  const removeId = (Id) => {
    setColumnOrder(columnOrder.filter((columnId) => columnId !== Id));
  };

  const onDragEnd = (result) => {
    // Column/TaskCard dropped in nonvalid space
    if (!result.destination) {
      return;
    }

    // Column/TaskCard dropped in original space
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    // Column dropped in new valid space
    if (result.type === "column") {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(result.source.index, 1);
      newColumnOrder.splice(result.destination.index, 0, result.draggableId);
      setColumnOrder(newColumnOrder);
      return;
    }

    const sourceColumn = board.find(
      (column) => column.columnId === result.source.droppableId
    );
    const destinationColumn = board.find(
      (column) => column.columnId === result.destination.droppableId
    );
    const draggedCard = sourceColumn.cards.find(
      (card) => card.id === result.draggableId
    );

    // TaskCard moved within same column
    if (sourceColumn === destinationColumn) {
      const cards = Array.from(sourceColumn.cards);
      cards.splice(result.source.index, 1);
      cards.splice(result.destination.index, 0, draggedCard);

      const updatedColumn = {
        ...sourceColumn,
        cards: cards,
      };

      const updatedState = () => {
        const columns = Array.from(board);
        const columnIndex = columns.findIndex(
          (column) => column.columnId === updatedColumn.columnId
        );
        columns[columnIndex] = updatedColumn;
        return columns;
      };

      setBoard(updatedState());
      return;
    }

    //TaskCard moved from one column to another
    const sourceCards = Array.from(sourceColumn.cards);
    sourceCards.splice(result.source.index, 1);
    const newSourceColumn = {
      ...sourceColumn,
      cards: sourceCards,
    };

    const destinationCards = Array.from(destinationColumn.cards);
    destinationCards.splice(result.destination.index, 0, draggedCard);
    const newDestinationColumn = {
      ...destinationColumn,
      cards: destinationCards,
    };

    const updatedState = () => {
      const columns = Array.from(board);
      const newDestinationIndex = columns.findIndex(
        (column) => column.columnId === newDestinationColumn.columnId
      );
      const newSourceIndex = columns.findIndex(
        (column) => column.columnId === newSourceColumn.columnId
      );
      columns[newDestinationIndex] = newDestinationColumn;
      columns[newSourceIndex] = newSourceColumn;
      return columns;
    };

    setBoard(updatedState());
  };

  const mappedColumns = columnOrder.map((columnId, index) => {
    const column = board.find((column) => column.columnId === columnId);

    return (
      <Column
        column={column}
        columnOrder={columnOrder}
        index={index}
        key={columnId}
        updateBoard={updateBoard}
        board={board}
        removeId={removeId}
      />
    );
  });

  return (
    <>
      <NavBar
        addNewId={addNewId}
        updateBoard={updateBoard}
        globalCount={props.globalCount}
        globalIncrement={props.globalIncrement}
        board={board}
      />
      <div className="container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="columns-board"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="columns"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {mappedColumns}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};
