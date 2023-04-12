import {
  type DistributedGuests,
  type Guest,
  RoomCategory,
} from "../types/types";

export const isPremiumGuest = (willingToPay: Guest): boolean =>
  willingToPay >= 100;

export const sortNumbersDescending = (a: number, b: number): 1 | -1 | 0 => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

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

  const premiumRoomsLeft = premiumRooms;
  const economyRoomsLeft = economyRooms;
  const distributedGuests: DistributedGuests = {
    [RoomCategory.PREMIUM]: [],
    [RoomCategory.ECONOMY]: [],
  };

  const { economy, premium } = splitGuestsIntoTwoGroups(
    guestsSortedByPaymentWill
  );

  // premium first phase
  // const premiumGuests = guestsSortedByPaymentWill.filter(isPremiumCustomer);
  // premiumGuests.forEach((guest) => {
  //   if (premiumRoomsLeft) {
  //     distributedCustomers[RoomCategory.PREMIUM].push(guest);
  //     premiumRoomsLeft--;
  //   }
  // });

  // const economyGuests = g;

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
