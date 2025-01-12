import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useMemo, useState } from "react";

import { styled } from "@stitches/react";
import clsx from "clsx";
import TaskComponent from "@/components/TaskComponent";
import { useDisclosure, useListState } from "@mantine/hooks";
import { Modal, Skeleton } from "@mantine/core";
import AddTask from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import getDaysInMonth from "@/utils/getDaysInMonth";
import { Task, useTasks } from "@/contexts/TasksContext";
import { getMonthDetails } from "@/utils/getMonthDetails";

const classes = {
  item: styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0",
    border: "1px solid $colors$gray2",
    padding: "12px",
    backgroundColor: "#f2f4f4",
    marginBottom: "$spacing$sm",
  }),
  itemDragging: styled("div", {
    boxShadow: "$shadows$sm",
  }),
  symbol: styled("div", {
    fontSize: "30px",
    fontWeight: "700",
    width: "60px",
  }),
};
const Text = styled("p", {
  fontWeight: 700,
  fontSize: "1rem",
  color: "#485876FF",
});

const TextTwo = styled("p", {
  fontWeight: 400,
  fontSize: 14,
  color: "#627495FF",
});

const Block = styled("p", {
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  padding: "0.5rem 0.5rem",
  justifyContent: "space-between",
});

const FlexRow = styled("p", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const FlexRowTwo = styled("p", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  justifyContent: "center",
});

const CellBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",
  backgroundColor: "#E3E5E6",
  padding: "0.5rem",
  columnSpan: 1,
  height: "100%",
  minHeight: "180px",
});

const DisableCellBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",
  backgroundColor: "#E3E5E6",
  padding: "0.5rem",
  columnSpan: 1,
  height: "100%",
  minHeight: "180px",
  opacity: 0.3,
});
const GridContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  width: "100%",
  gap: "0.3rem",
  backgroundColor: "#eff0f1",
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
});
const GridContainer2 = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  width: "100%",
  gap: "0.3rem",
  backgroundColor: "#eff0f1",
  "@media (max-width: 600px)": {
    display: "none",
  },
});

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DayCellBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",
  padding: "0.5rem",
  columnSpan: 1,
  height: 50,
  backgroundColor: "#eeeeee",
});

const DayText = styled(TextTwo, {
  fontSize: "18px",
});

const Header = styled("span", {
  display: "flex",
  justifyContent: "space-between",
  padding: ".8rem 1.5rem",
  background: "linear-gradient(to right, #FB923C, #FBBF24)",
});

const HeaderText = styled("p", {
  fontSize: "1.75rem",
  fontWeight: "bold",
  color: "#FFFFFF",
});

const AddTaskButton = styled("button", {
  backgroundColor: "#FFFFFF",
  color: "#1E3A8A",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  "&:hover": {
    backgroundColor: "#F3F4F6",
  },
});

const Input = styled("input", {
  border: "1px solid #D1D5DB",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  outline: "none",
});

function Calendar() {
  const { tasks, setTasks, filterTasksByText, isLoading, error, results }: any =
    useTasks();
  const [searchQuery, setSearchQuery] = useState("");

  const [, handlers] = useListState(tasks);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const columns = useMemo(() => {
    const filteredList: { [key: string]: Task[] } = {};
    const currentYear = new Date().getFullYear();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    daysInMonth.forEach((day) => {
      filteredList[day] = [];
    });

    const tasksToFilter = searchQuery
      ? filterTasksByText(tasks, searchQuery)
      : tasks;

    tasksToFilter?.forEach((item: Task) => {
      const itemMonth = new Date(item.date).getMonth();
      const columnKey = new Date(item.date).toISOString().split("T")[0]; // Use date string as column key

      if (itemMonth === currentMonth) {
        if (!filteredList[columnKey]) {
          filteredList[columnKey] = [];
        }
        filteredList[columnKey].push(item);
      }
    });

    return filteredList;
  }, [tasks, currentMonth, searchQuery]);

  const updateState = (modifiedItem: any) => {
    // Update data array with modified item and columns
    const updatedData = [...tasks];
    const itemIndex = tasks.findIndex(
      (item: any) => item.id === modifiedItem.id
    );

    if (itemIndex !== -1) {
      updatedData[itemIndex] = modifiedItem; // Replace item in data array
    }

    setTasks(updatedData);
  };

  const updateState2 = (
    modifiedItem: any,
    source: number,
    destination: number
  ) => {
    // Update data array with modified item and columns
    const updatedData = [...tasks];
    const currentColumnList = columns[modifiedItem.date];
    const itemOne = currentColumnList[source];
    const itemTwo = currentColumnList[destination];

    // Switch the itemOne and itemTwo positions in the currentColumnList
    const result = updatedData.map((item: Task) => {
      if (item.id === itemOne.id) {
        return itemTwo;
      } else if (item.id === itemTwo.id) {
        return itemOne;
      } else {
        return item;
      }
    });

    setTasks(result);
  };

  const handleDrop = (item: any, targetColumn: any) => {
    // Update item date based on target column
    item.date = targetColumn;

    updateState(item);
  };

  const handleDrop2 = (
    item: any,
    targetColumn: any,
    index1: number,
    index2: number
  ) => {
    // Update item date based on target column
    item.date = targetColumn;

    updateState2(item, index1, index2);
  };

  const handleDragEnd = ({
    destination,
    source,
  }: {
    source: any;
    destination: any;
  }) => {
    if (!destination) return;

    const item: any = columns[source.droppableId][source.index];
    if (item.type === "holiday") return;
    item.previousColumn = item.date;

    if (source.droppableId === destination.droppableId) {
      console.log("source.index", source.index, destination.index);
      handlers.reorder({ from: source.index, to: destination.index });
      handleDrop2(
        item,
        destination.droppableId,
        source.index,
        destination.index
      );
    } else {
      handleDrop(item, destination.droppableId);
    }

    // Reorder items within the same column (optional)
  };

  const [currentTask, setCurrentTask] = useState({});
  const [openedTwo, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  const renderColumn = (columnKey: any, columnItems: Task[]) => (
    <Droppable droppableId={columnKey} key={columnKey} direction="vertical">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <CellBox>
            <FlexRow>
              <Text>
                {columnKey.slice(columnKey.length - 2, columnKey.length)}
              </Text>
              {columnItems?.length > 0 && (
                <TextTwo>{columnItems?.length} Tasks</TextTwo>
              )}
            </FlexRow>
            {columnItems.map((item: Task, index: any) => (
              <Draggable
                key={item.id}
                index={index}
                draggableId={`${item.id}`}
                isDragDisabled={item.type === "holiday"}
              >
                {(provided, snapshot) => (
                  <div
                    onClick={() => {
                      if (item.type === "holiday") return;
                      setCurrentTask(item);
                      openEdit();
                    }}
                    className={clsx(classes.item, {
                      [classes.itemDragging.toString()]: snapshot.isDragging,
                    })}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onDragEnd={({ destination, source }: any) =>
                      handleDragEnd({ destination, source })
                    }
                  >
                    <TaskComponent data={item} />
                  </div>
                )}
              </Draggable>
            ))}
          </CellBox>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  const [opened, { open, close }] = useDisclosure(false);

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
  };

  return (
    <div>
      <Modal title="Add Task" opened={opened} onClose={close}>
        <AddTask close={close} />
      </Modal>
      <Modal title="Edit Task" opened={openedTwo} onClose={closeEdit}>
        <EditTask
          task={currentTask}
          setTask={setCurrentTask}
          close={closeEdit}
        />
      </Modal>
      <Header>
        <HeaderText>Calendar</HeaderText>
        <AddTaskButton onClick={open}>Add Task</AddTaskButton>
      </Header>
      <Block>
        <FlexRow>
          <AddTaskButton onClick={handlePrevMonth}>Prev</AddTaskButton>
          <AddTaskButton onClick={handleNextMonth}>Next</AddTaskButton>
        </FlexRow>
        <Text>{getMonthDetails(currentMonth)?.currentMonthName}</Text>
        <Input
          placeholder="Enter keyword to search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Block>
      <GridContainer2>
        {daysOfWeek.map((day) => (
          <DayCellBox key={day}>
            <FlexRowTwo>
              <DayText>{day}</DayText>
            </FlexRowTwo>
          </DayCellBox>
        ))}
      </GridContainer2>
      <DragDropContext
        onDragEnd={({ destination, source }: any) =>
          handleDragEnd({ destination, source })
        }
      >
        {isLoading && (
          <GridContainer>
            {Array.from({ length: 31 }, (_, index) => (
              <Skeleton height={180} width="100%" key={index} />
            ))}
          </GridContainer>
        )}
        {results && (
          <>
            <GridContainer>
              {getMonthDetails(currentMonth)?.prevMonthOverlap?.map(
                (day, index) => (
                  <DisableCellBox key={index}>
                    <FlexRow>
                      <Text>{day.slice(day.length - 2, day.length)}</Text>
                      {getMonthDetails(currentMonth)?.prevMonthOverlap?.length -
                        1 ===
                        index && (
                        <Text>
                          {getMonthDetails(currentMonth)?.prevMonthName}
                        </Text>
                      )}
                    </FlexRow>
                  </DisableCellBox>
                )
              )}
              {Object.keys(columns).map((cellKey) =>
                renderColumn(cellKey, columns[cellKey])
              )}
              {getMonthDetails(currentMonth)?.nextMonthOverlap?.map(
                (day, index) => (
                  <DisableCellBox key={index}>
                    <FlexRow>
                      <Text>{day.slice(day.length - 2, day.length)}</Text>
                      {index === 0 && (
                        <Text>
                          {getMonthDetails(currentMonth)?.nextMonthName}
                        </Text>
                      )}
                    </FlexRow>
                  </DisableCellBox>
                )
              )}
            </GridContainer>
          </>
        )}
      </DragDropContext>
    </div>
  );
}

export default Calendar;
