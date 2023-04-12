import { type FC, useState } from "react";
import { Guests } from "./Guests/Guests";
import { type Guest } from "../../types/types";
import mockGuests from "../../mocks/guests.json";
import "./SmartHostForm.css";

export const SmartHostForm: FC = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  return (
    <div className="smartHostForm">
      <Guests
        guests={guests}
        setGuests={setGuests}
        resetToInitialGuests={() => {
          setGuests(mockGuests);
        }}
      />
    </div>
  );
};
