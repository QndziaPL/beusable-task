import React, { type FC, useState } from "react";

import mockGuests from "../../mocks/guests.json";
import { type AvailableRooms, type Guest } from "../../types/types";
import { Section } from "../Section/Section";

import { Guests } from "./Guests/Guests";
import { ManageGuestsButtons } from "./Guests/ManageGuestsButtons/ManageGuestsButtons";
import { IncomeResults } from "./IncomeResults/IncomeResults";
import { Rooms } from "./Rooms/Rooms";

import "./SmartHostForm.css";

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
