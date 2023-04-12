import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { GuestInput } from "./GuestInput";

describe("GuestInput suite", () => {
  it("should render with initial state", () => {
    const { getByText, queryByRole } = render(
      <GuestInput addNewGuest={() => {}} />
    );
    expect(getByText("+")).toBeInTheDocument();
    expect(queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should expand when clicked", () => {
    const { getByText, getByRole, queryByText } = render(
      <GuestInput addNewGuest={() => {}} />
    );
    fireEvent.click(getByText("+"));
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(queryByText("+")).not.toBeInTheDocument();
  });

  it("should close when x button is clicked", () => {
    const { getByText, queryByText, queryByRole } = render(
      <GuestInput addNewGuest={() => {}} />
    );
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("close"));
    expect(queryByText("x")).not.toBeInTheDocument();
    expect(getByText("+")).toBeInTheDocument();
    expect(queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should only allow numeric input", () => {
    const { getByRole, getByText } = render(
      <GuestInput addNewGuest={() => {}} />
    );
    fireEvent.click(getByText("+"));
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc123" } });
    expect(input).toHaveValue("123");
  });

  it("should add new guest when value is entered and add button is clicked", () => {
    const addNewGuestMock = jest.fn();
    const { getByRole, getByText } = render(
      <GuestInput addNewGuest={addNewGuestMock} />
    );
    fireEvent.click(getByText("+"));
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(getByText("add"));
    expect(addNewGuestMock).toHaveBeenCalledWith(2);
  });

  it("should not add new guest when value is not entered", () => {
    const addNewGuestMock = jest.fn();
    const { getByText } = render(<GuestInput addNewGuest={addNewGuestMock} />);
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("add"));
    expect(addNewGuestMock).not.toHaveBeenCalled();
  });

  it("should not add new guest when value is over 3 digits", () => {
    const addNewGuestMock = jest.fn();
    const { getByRole, getByText } = render(
      <GuestInput addNewGuest={addNewGuestMock} />
    );
    fireEvent.click(getByText("+"));
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.click(getByText("add"));
    expect(addNewGuestMock).not.toHaveBeenCalled();
  });
});
