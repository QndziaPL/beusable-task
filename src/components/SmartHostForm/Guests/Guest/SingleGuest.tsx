import { type FC } from "react";

import { isPremiumGuest } from "../../../../helpers/distributeGuests";
import { type Guest } from "../../../../types/types";

export interface GuestProps {
  removeGuest: () => void;
  guest: Guest;
}
export const SingleGuest: FC<GuestProps> = ({ removeGuest, guest }) => {
  const onClick = (): void => {
    const deleteConfirmContentMessage = `Do you want to delete ${guest}\u00A0€ guest?`;
    if (confirm(deleteConfirmContentMessage)) removeGuest();
  };

  return (
    <div className="guest" onClick={onClick}>
      <span>{guest}&nbsp;€</span>
      {isPremiumGuest(guest) && (
        <>
          <div className="guestCornerMarkBackground"></div>
          <div className="guestCornerMarkSign">P</div>
        </>
      )}
    </div>
  );
};
