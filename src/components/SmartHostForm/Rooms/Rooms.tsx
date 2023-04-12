import { type Dispatch, type FC, type SetStateAction } from "react";

import { type AvailableRooms, RoomCategory } from "../../../types/types";

import { SingleRoomCategory } from "./SingleRoomCategory";

export interface RoomsProps {
  rooms: AvailableRooms;
  setRooms: Dispatch<SetStateAction<AvailableRooms>>;
}
export const Rooms: FC<RoomsProps> = ({ rooms, setRooms }) => {
  const increaseOrDecrease = (
    category: RoomCategory,
    type: "increase" | "decrease"
  ): void => {
    setRooms((prev) => {
      const copy = { ...prev };
      const factor = type === "increase" ? 1 : -1;
      copy[category] = getNewValueButNoLessThanZero(copy[category], factor);

      return copy;
    });
  };

  return (
    <div>
      <SingleRoomCategory
        category={RoomCategory.PREMIUM}
        amount={rooms[RoomCategory.PREMIUM]}
        increaseOrDecrease={(type) => {
          increaseOrDecrease(RoomCategory.PREMIUM, type);
        }}
      />
      <SingleRoomCategory
        category={RoomCategory.ECONOMY}
        amount={rooms[RoomCategory.ECONOMY]}
        increaseOrDecrease={(type) => {
          increaseOrDecrease(RoomCategory.ECONOMY, type);
        }}
      />
    </div>
  );
};

export const getNewValueButNoLessThanZero = (
  num1: number,
  num2: number
): number => {
  const sum = num1 + num2;
  return sum > 0 ? sum : 0;
};
