import { type Dispatch, type FC, type SetStateAction } from "react";

import { type Guest } from "../../../types/types";

import { SingleGuest } from "./Guest/SingleGuest";

import "./Guests.css";

export interface GuestsProps {
  guests: Guest[];
  setGuests: Dispatch<SetStateAction<Guest[]>>;
}
export const Guests: FC<GuestsProps> = ({ guests, setGuests }) => {
  const removeGuest = (index: number): void => {
    setGuests((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  return (
    <div className="guests">
      {guests.map((guest, i) => (
        <SingleGuest
          key={i}
          guest={guest}
          removeGuest={() => {
            removeGuest(i);
          }}
        />
      ))}
    </div>
  );
};
