import { type Dispatch, type FC, type SetStateAction } from "react";
import { type Guest } from "../../../types/types";
import "./Guests.css";
import { GuestInput } from "./GuestInput/GuestInput";

export interface GuestsProps {
  guests: Guest[];
  setGuests: Dispatch<SetStateAction<Guest[]>>;
  resetToInitialGuests: () => void;
}
export const Guests: FC<GuestsProps> = ({
  guests,
  setGuests,
  resetToInitialGuests,
}) => {
  const onRemoveGuestClick = (index: number): void => {
    setGuests((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  return (
    <div className="guests">
      {guests.map((guest, i) => (
        <div
          onClick={() => {
            onRemoveGuestClick(i);
          }}
          key={i}
          className="guestCard guest"
        >
          {guest}&nbsp;€
        </div>
      ))}
      <GuestInput
        addNewGuest={(guest) => {
          setGuests((prev) => [...prev, guest]);
        }}
      />
      <div className="guestCard reset" onClick={resetToInitialGuests}>
        reset
      </div>
    </div>
  );
};
