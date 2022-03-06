import { getAllByAltText, render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskList from "../";
import * as DB from "../../../helpers/db";
import {
  maxReminderDaysInAdvance,
  minReminderInterval,
} from "../../TaskForm/components/Form/store/constants";

const renderTaskList = () => {
  render(
    <BrowserRouter>
      <TaskList />
    </BrowserRouter>
  );
};

describe("Task List", () => {
  test("If the default message is displayed when the task list is empty", () => {
    renderTaskList();
    // this will throw error if the element not found
    screen.getByTestId("no-tasks-list");
  });
  test("If the task list is displayed when the task list data is available", () => {
    const tomorrowDate = new Date(Date.now() + 3600 * 1000 * 24);
    DB.addItem({
      id: 1,
      title: "Test",
      description: "Test",
      expiresOn: tomorrowDate,
      reminderDaysInAdvance: maxReminderDaysInAdvance,
      reminderDaysInterval: minReminderInterval,
    });
    renderTaskList();
    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(1);
    // clear local storage
    DB.clearItems();
  });
});
