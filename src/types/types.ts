import type guests from "../mocks/guests.json";

export type Guest = (typeof guests)[number];

export enum RoomCategory {
  PREMIUM = "premium",
  ECONOMY = "economy",
}

export interface DistributedGuests {
  [RoomCategory.PREMIUM]: number[];
  [RoomCategory.ECONOMY]: number[];
}
