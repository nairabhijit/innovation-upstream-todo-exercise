import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import TaskDetails from "./TaskDetails";
import TaskForm from "./TaskForm/components/Form";
import TaskList from "./TaskList";

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/add" element={<TaskForm />} />
        <Route path="/tasks/:taskId/edit" element={<TaskForm />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
