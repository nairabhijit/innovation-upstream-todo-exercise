import "@testing-library/react";
import { formatDate } from "./date";

describe("Date format utility", () => {
  test("mm/dd/yyyy", () => {
    const formattedDate = formatDate(new Date("01/01/2022"), "mm/dd/yyyy");
    expect(formattedDate).toBe("01/01/2022");
  });
  test("MM dd, yyyy", () => {
    const formattedDate = formatDate(new Date("01/01/2022"), "MM dd, yyyy");
    expect(formattedDate).toBe("Jan 01, 2022");
  });
});
