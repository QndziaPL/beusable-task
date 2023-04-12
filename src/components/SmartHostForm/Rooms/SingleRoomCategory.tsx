import { type FC } from "react";

import "./SingleRoomCategory.css";

export interface SingleRoomCategoryProps {
  category: string;
  amount: number;
  increaseOrDecrease: (type: "increase" | "decrease") => void;
}
export const SingleRoomCategory: FC<SingleRoomCategoryProps> = ({
  category,
  amount,
  increaseOrDecrease,
}) => (
  <div className="roomTypeContainer">
    <span className="roomCategory">{category}</span>
    <span className="numberOfRooms">{amount}</span>
    <div className="roomButtonsContainer">
      <button
        disabled={amount === 0}
        onClick={() => {
          increaseOrDecrease("decrease");
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          increaseOrDecrease("increase");
        }}
      >
        +
      </button>
    </div>
  </div>
);
