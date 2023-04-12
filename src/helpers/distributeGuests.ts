import {
  type DistributedGuests,
  type Guest,
  RoomCategory,
} from "../types/types";

export type DistributeGuestsFunctionType = (
  guests: Guest[],
  premiumRooms: number,
  economyRooms: number
) => DistributedGuests;
export const distributeGuests: DistributeGuestsFunctionType = (
  guests,
  premiumRooms,
  economyRooms
) => {
  // based on what i've seen on test result expectations this logic depends on paymentWill, not the order of potential bookings
  const guestsSortedByPaymentWill = [...guests].sort(sortNumbersDescending);

  let premiumRoomsLeft = premiumRooms;
  let economyRoomsLeft = economyRooms;
  const distributedGuests: DistributedGuests = {
    [RoomCategory.PREMIUM]: [],
    [RoomCategory.ECONOMY]: [],
  };

  const { premium, economy } = splitGuestsIntoTwoGroups(
    guestsSortedByPaymentWill
  );

  premium.forEach((guest) => {
    if (premiumRoomsLeft) {
      distributedGuests[RoomCategory.PREMIUM].push(guest);
      premiumRoomsLeft--;
    }
  });

  const guestsExceedingEconomyCapacity = numberOfGuestsExceedingEconomyCapacity(
    economy.length,
    economyRoomsLeft
  );

  if (premiumRoomsLeft && guestsExceedingEconomyCapacity) {
    let guestsToUpgrade = numberOfGuestsThatWillHaveUpgrade(
      guestsExceedingEconomyCapacity,
      premiumRoomsLeft
    );

    economy.forEach((guest) => {
      if (guestsToUpgrade > 0) {
        distributedGuests[RoomCategory.PREMIUM].push(guest);
        premiumRoomsLeft--;
        guestsToUpgrade--;
      } else {
        if (economyRoomsLeft) {
          distributedGuests[RoomCategory.ECONOMY].push(guest);
          economyRoomsLeft--;
        }
      }
    });
  } else {
    economy.forEach((guest) => {
      if (economyRoomsLeft) {
        distributedGuests[RoomCategory.ECONOMY].push(guest);
        economyRoomsLeft--;
      }
    });
  }

  return distributedGuests;
};

export type SplitGuestsIntoTwoGroupsFunctionType = (
  guests: Guest[]
) => DistributedGuests;
export const splitGuestsIntoTwoGroups: SplitGuestsIntoTwoGroupsFunctionType = (
  guests
) =>
  guests.reduce<DistributedGuests>(
    (acc, curr) => {
      const copy = { ...acc };
      copy[
        isPremiumGuest(curr) ? RoomCategory.PREMIUM : RoomCategory.ECONOMY
      ].push(curr);

      return copy;
    },
    {
      [RoomCategory.PREMIUM]: [],
      [RoomCategory.ECONOMY]: [],
    }
  );

export const isPremiumGuest = (willingToPay: Guest): boolean =>
  willingToPay >= 100;

export const sortNumbersDescending = (a: number, b: number): 1 | -1 | 0 => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

export const numberOfGuestsExceedingEconomyCapacity = (
  numberOfGuests: number,
  numberOfEconomyRooms: number
): number => numberOfGuests - numberOfEconomyRooms;

export const numberOfGuestsThatWillHaveUpgrade = (
  numberOfGuestsExceedingEconomyCapacity: number,
  numberOfAvailablePremiumRooms: number
): number =>
  Math.min(
    numberOfAvailablePremiumRooms,
    numberOfGuestsExceedingEconomyCapacity
  );

export const calculateRoomsIncome = (guests: Guest[]): number =>
  guests.reduce((acc, curr) => acc + curr, 0);
