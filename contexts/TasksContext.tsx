import React, { createContext, useState, useContext, ReactNode } from "react";
import { useQuery } from "react-query";
import getHolidays from "../pages/api/getHolidays";

export interface TasksContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  removeTask: (id: string) => void;
  filterTasksByText: (tasks: Task[], text: string) => void | Task[];
  // toggleTaskCompletion: (id: string) => void;
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  isLoading?: boolean;
  results?: any;
  error?: any;
}

export interface Task {
  name: string;
  date: Date;
  status: "pending" | "active" | "completed" | "overdue";
  type: "holiday" | "task";
  description: string;
  id: string;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: "Task 19",
      date: new Date("2025-01-11"),
      status: "pending",
      type: "task",
      description: "Description for Task 1",
      id: "1a2b3c4d-1",
    },
    {
      name: "Task 2",
      date: new Date("2025-01-22"),
      status: "active",
      type: "task",
      description: "Description for Task 2",
      id: "2b3c4d5e-2",
    },
    {
      name: "Task 3",
      date: new Date("2025-01-01"),
      status: "completed",
      type: "task",
      description: "Description for Task 3",
      id: "3c4d5e6f-3",
    },
    {
      name: "Task 4",
      date: new Date("2025-01-01"),
      status: "overdue",
      type: "task",
      description: "Description for Task 4",
      id: "4d5e6f7g-4",
    },
    {
      name: "Task 5",
      date: new Date("2025-01-02"),
      status: "pending",
      type: "task",
      description: "Description for Task 5",
      id: "5e6f7g8h-5",
    },
    {
      name: "Task 6",
      date: new Date("2025-01-06"),
      status: "active",
      type: "task",
      description: "Description for Task 6",
      id: "6f7g8h9i-6",
    },
    {
      name: "Task 7",
      date: new Date("2025-01-02"),
      status: "completed",
      type: "task",
      description: "Description for Task 7",
      id: "7g8h9i0j-7",
    },
    {
      name: "Task 8",
      date: new Date("2025-01-02"),
      status: "overdue",
      type: "task",
      description: "Description for Task 8",
      id: "8h9i0j1k-8",
    },
    {
      name: "Task 9",
      date: new Date("2025-01-05"),
      status: "pending",
      type: "task",
      description: "Description for Task 9",
      id: "9i0j1k2l-9",
    },
    {
      name: "Task 10",
      date: new Date("2025-01-14"),
      status: "active",
      type: "task",
      description: "Description for Task 10",
      id: "0j1k2l3m-10",
    },
    {
      name: "Task 11",
      date: new Date("2025-01-13"),
      status: "completed",
      type: "task",
      description: "Description for Task 11",
      id: "1k2l3m4n-11",
    },
    {
      name: "Task 12",
      date: new Date("2025-01-07"),
      status: "overdue",
      type: "task",
      description: "Description for Task 12",
      id: "2l3m4n5o-12",
    },
  ]);

  const { data, isLoading, error } = useQuery({
    queryKey: "tasks",
    queryFn: getHolidays,
    onSuccess: (item) => {
      const holidays = item.map((holiday: any) => ({
        name: holiday.name,
        date: holiday.date,
        type: "holiday",
        id: crypto.randomUUID(),
        description: holiday.name,
        status:
          Date.now() > new Date(holiday.date).getTime()
            ? "completed"
            : "pending",
      }));
      setTasks((prevTasks) => [...prevTasks, ...holidays]);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  console.log("data", data);
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filterTasksByText = (tasks: Task[], searchText: string): Task[] => {
    const result = tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
    );
    return result || [];
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        removeTask,
        editTask,
        filterTasksByText,
        isLoading,
        results: data,
        error,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextProps => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export default TasksProvider;
// const filterTasks = (searchText: string) => {
//   setTasks(prevTasks =>
//     prevTasks.filter(task =>
//       task.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchText.toLowerCase())
//     )
//   );
// };
