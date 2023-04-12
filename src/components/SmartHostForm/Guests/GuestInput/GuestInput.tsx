import { type ChangeEvent, type FC, useState } from "react";

export interface GuestInputProps {
  addNewGuest: (guest: number) => void;
}
export const GuestInput: FC<GuestInputProps> = ({ addNewGuest }) => {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (!newValue || newValue === "0") {
      setValue("");
    } else {
      if (newValue.length > 3) return;
      setValue(newValue);
    }
  };

  const handleOnWholeCardClick = (): void => {
    if (!expanded) setExpanded(true);
  };

  const handleAddNewGuest = (): void => {
    if (value.length) addNewGuest(Number(value));
  };

  return (
    <div
      onClick={handleOnWholeCardClick}
      className={`guestCard addGuest ${expanded ? "expanded" : ""}`}
    >
      {expanded ? (
        <>
          <button
            onClick={() => {
              setExpanded(false);
            }}
          >
            close
          </button>
          <input
            placeholder="amount"
            role="textbox"
            maxLength={3}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={onChange}
          />
          <button onClick={handleAddNewGuest}>add</button>
        </>
      ) : (
        <span>+</span>
      )}
    </div>
  );
};
