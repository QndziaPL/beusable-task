import React, { type FC, useState } from "react";
import { Guests } from "./Guests/Guests";
import { type AvailableRooms, type Guest } from "../../types/types";
import mockGuests from "../../mocks/guests.json";
import "./SmartHostForm.css";
import { Section } from "../Section/Section";
import { Rooms } from "./Rooms/Rooms";
import { IncomeResults } from "./IncomeResults/IncomeResults";
import { ManageGuestsButtons } from "./Guests/ManageGuestsButtons/ManageGuestsButtons";

export const SmartHostForm: FC = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [rooms, setRooms] = useState<AvailableRooms>({
    premium: 3,
    economy: 3,
  });

  return (
    <div className="smartHostForm">
      <Section
        title="Guests"
        additionalContent={
          <ManageGuestsButtons
            resetToInitialGuests={() => {
              setGuests(mockGuests);
            }}
            addToGuests={(guest) => {
              setGuests((prev) => [...prev, guest]);
            }}
          />
        }
      >
        <Guests guests={guests} setGuests={setGuests} />
      </Section>
      <Section title="Free hotel rooms">
        <Rooms rooms={rooms} setRooms={setRooms} />
      </Section>
      <Section title="Summary">
        <IncomeResults guests={guests} rooms={rooms} />
      </Section>
    </div>
  );
};
