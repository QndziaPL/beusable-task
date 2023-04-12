import {
  type ChangeEvent,
  type FC,
  type SyntheticEvent,
  useState,
} from "react";

import { type Guest } from "../../../../types/types";

import "./ManageGuestsButtons.css";

export interface ManageGuestsButtonsProps {
  addToGuests: (guest: Guest) => void;
  resetToInitialGuests: () => void;
}
export const ManageGuestsButtons: FC<ManageGuestsButtonsProps> = ({
  addToGuests,
  resetToInitialGuests,
}) => {
  const [value, setValue] = useState("");

  const handleAddNewGuest = (e: SyntheticEvent): void => {
    if (value.length) addToGuests(Number(value));
    e.preventDefault();
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (!newValue || newValue === "0") {
      setValue("");
    } else {
      if (newValue.length > 3) return;
      setValue(newValue);
    }
  };

  return (
    <div className="manageGuestsButtons">
      <button className="resetButton" onClick={resetToInitialGuests}>
        reset
      </button>
      <form onSubmit={handleAddNewGuest}>
        <input
          required
          placeholder="amount"
          role="textbox"
          maxLength={3}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={onChange}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};
