import { fireEvent, render } from "@testing-library/react";

import { ManageGuestsButtons } from "./ManageGuestsButtons";

describe("ManageGuestsButtons suite", () => {
  const mockAddToGuests = jest.fn();
  const mockResetToInitialGuests = jest.fn();

  beforeEach(() => {
    mockAddToGuests.mockClear();
    mockResetToInitialGuests.mockClear();
  });

  it("should render correctly", () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <ManageGuestsButtons
        addToGuests={mockAddToGuests}
        resetToInitialGuests={mockResetToInitialGuests}
      />
    );
    expect(getByText("reset")).toBeInTheDocument();
    expect(getByRole("button", { name: "add" })).toBeInTheDocument();
    expect(getByPlaceholderText("amount")).toBeInTheDocument();
  });

  it("should call addToGuests when add button is clicked", () => {
    const { getByRole, getByPlaceholderText } = render(
      <ManageGuestsButtons
        addToGuests={mockAddToGuests}
        resetToInitialGuests={mockResetToInitialGuests}
      />
    );
    const addButton = getByRole("button", { name: "add" });
    const input = getByPlaceholderText("amount");
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(addButton);
    expect(mockAddToGuests).toHaveBeenCalledWith(10);
  });

  it("should not call addToGuests when add button is clicked and input is empty", () => {
    const { getByRole } = render(
      <ManageGuestsButtons
        addToGuests={mockAddToGuests}
        resetToInitialGuests={mockResetToInitialGuests}
      />
    );
    const addButton = getByRole("button", { name: "add" });
    fireEvent.click(addButton);
    expect(mockAddToGuests).not.toHaveBeenCalled();
  });

  it("should call resetToInitialGuests when reset button is clicked", () => {
    const { getByText } = render(
      <ManageGuestsButtons
        addToGuests={mockAddToGuests}
        resetToInitialGuests={mockResetToInitialGuests}
      />
    );
    const resetButton = getByText("reset");
    fireEvent.click(resetButton);
    expect(mockResetToInitialGuests).toHaveBeenCalled();
  });

  it("should update input value on change", () => {
    const { getByPlaceholderText } = render(
      <ManageGuestsButtons
        addToGuests={mockAddToGuests}
        resetToInitialGuests={mockResetToInitialGuests}
      />
    );
    const input = getByPlaceholderText("amount");
    fireEvent.change(input, { target: { value: "5" } });
    expect(input).toHaveValue("5");
  });

  it("should update input value to empty when invalid characters are entered", () => {
    const { getByPlaceholderText } = render(
      <ManageGuestsButtons
        addToGuests={mockAddToGuests}
        resetToInitialGuests={mockResetToInitialGuests}
      />
    );
    const input = getByPlaceholderText("amount");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toHaveValue("");
  });

  it("should not update input value when value is 0", () => {
    const { getByRole } = render(
      <ManageGuestsButtons
        addToGuests={() => {}}
        resetToInitialGuests={() => {}}
      />
    );
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "0" } });
    expect(input.value).toEqual("");
  });
});
