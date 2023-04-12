import { type Dispatch, type FC, type SetStateAction } from "react";

import { isPremiumGuest } from "../../../helpers/distributeGuests";
import { type Guest } from "../../../types/types";

import "./Guests.css";

export interface GuestsProps {
  guests: Guest[];
  setGuests: Dispatch<SetStateAction<Guest[]>>;
}
export const Guests: FC<GuestsProps> = ({ guests, setGuests }) => {
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
          className="guest"
        >
          <span>{guest}&nbsp;€</span>
          {isPremiumGuest(guest) && (
            <>
              <div className="guestCornerMarkBackground"></div>
              <div className="guestCornerMarkSign">P</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
