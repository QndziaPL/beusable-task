import { type FC, useMemo } from "react";
import {
  type AvailableRooms,
  type Guest,
  RoomCategory,
} from "../../../types/types";
import "./IncomeResults.css";
import {
  calculateRoomsIncome,
  createFormattedStringSummaryForRoomCategory,
  distributeGuests,
} from "../../../helpers/distributeGuests";

export interface IncomeResultsProps {
  guests: Guest[];
  rooms: AvailableRooms;
}
export const IncomeResults: FC<IncomeResultsProps> = ({ guests, rooms }) => {
  const { premium, economy } = useMemo(
    () =>
      distributeGuests(
        guests,
        rooms[RoomCategory.PREMIUM],
        rooms[RoomCategory.ECONOMY]
      ),
    [guests, rooms[RoomCategory.ECONOMY], rooms[RoomCategory.PREMIUM]]
  );

  const overallIncome =
    calculateRoomsIncome(premium) + calculateRoomsIncome(economy);

  return (
    <div className="incomeResults">
      <p>{createFormattedStringSummaryForRoomCategory("Premium", premium)}</p>
      <p>{createFormattedStringSummaryForRoomCategory("Economy", economy)}</p>
      <p>Overall Income: EUR {overallIncome}</p>
    </div>
  );
};
