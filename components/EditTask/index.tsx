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

const Select = styled("select", {
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

function EditTask({ task, setTask, close }: any) {
  const { editTask } = useTasks();

  console.log("task", task);
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
        value={new Date(task.date).toISOString().split("T")[0]}
        onChange={(e) => setTask({ ...task, date: e.target.value })}
      />
      <Select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="overdue">Overdue</option>
        <option value="completed">Completed</option>
        <option value="active">Active</option>
      </Select>
      <Button
        onClick={() => {
          editTask(task);
          close();
        }}
      >
        Edit Task
      </Button>
    </ModalContainer>
  );
}

export default EditTask;
