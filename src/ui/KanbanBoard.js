import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { Column } from "./Column";
import { NewColumnButton } from "./NewColumnButton";

export const KanbanBoard = (props) => {
  const [columnOrder, setColumnOrder] = useState(["1", "2", "3", "4"]);
  const [board, setBoard] = useState([
    {
      columnId: "1",
      title: "To-Do",
      cards: [
        {
          id: "44",
          title: "Do a board",
          description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
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
      title: "Click text to change title",
      cards: [],
    },
    {
      columnId: "4",
      title: "Completed",
      cards: [],
    },
  ]);

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
        columnId={column.columnId}
        index={index}
        key={column.columnId}
        updateBoard={updateBoard}
        board={board}
      />
    );
  });

  return (
    <div>
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
