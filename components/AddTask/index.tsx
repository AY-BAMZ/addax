import { useTasks } from "@/contexts/TasksContext";
import { styled } from "@/lib/stitches";
import React, { useState } from "react";

const ModalContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Input = styled("input", {
  border: "1px solid #D1D5DB",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  outline: "none",
});

const Textarea = styled("textarea", {
  border: "1px solid #D1D5DB",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  outline: "none",
});

const Button = styled("button", {
  backgroundColor: "#1E3A8A",
  color: "#FFFFFF",
  padding: "0.5rem 1rem",
  outline: "none",
  borderRadius: "0.5rem",
  "&:hover": {
    backgroundColor: "#1E40AF",
  },
});
function AddTask({ close }: any) {
  const { addTask } = useTasks();

  const [task, setTask] = useState({
    name: "",
    date: Date.now().toString(),
    type: "task",
    id: crypto.randomUUID(),
    description: "",
    status: "pending",
  });
  return (
    <ModalContainer>
      <Input
        placeholder="Task Name"
        type="text"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <Textarea
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <Input
        placeholder="Task Date"
        type="date"
        value={task.date}
        onChange={(e) => setTask({ ...task, date: e.target.value })}
      />
      <Button
        onClick={() => {
          addTask(task as any);
          setTask({
            name: "",
            date: Date.now().toString(),
            type: "task",
            id: crypto.randomUUID(),
            description: "",
            status: "pending",
          });
          close();
        }}
      >
        Create Task
      </Button>
    </ModalContainer>
  );
}

export default AddTask;
