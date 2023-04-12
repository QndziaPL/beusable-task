import guests from "../mocks/guests.json";

import {
  calculateRoomsIncome,
  createFormattedStringSummaryForRoomCategory,
  distributeGuests,
  isPremiumGuest,
  numberOfGuestsExceedingEconomyCapacity,
  numberOfGuestsThatWillHaveUpgrade,
  sortNumbersDescending,
  splitGuestsIntoTwoGroups,
} from "./distributeGuests";

describe("helpers test suite", () => {
  describe("verifies guest status based on payment amount", () => {
    it("should confirm premium guest state if he pays over 100 euro", () => {
      expect(isPremiumGuest(123)).toBe(true);
    });

    it("should confirm premium guest state if he pays exactly 100 euro", () => {
      expect(isPremiumGuest(100)).toBe(true);
    });

    it("should deny premium guest state if he pays less than 100 euro", () => {
      expect(isPremiumGuest(99)).toBe(false);
    });
  });

  describe("tests sorting numbers in descending order", () => {
    it("should return -1 when A is bigger than B", () => {
      expect(sortNumbersDescending(2, 1)).toBe(-1);
    });

    it("should return 1 when A is smaller than B", () => {
      expect(sortNumbersDescending(3, 4)).toBe(1);
    });

    it("should return 0 when A and B are equal", () => {
      expect(sortNumbersDescending(5, 5)).toBe(0);
    });
  });

  describe("tests calculating rooms income", () => {
    it("should sum 1,2 and 3 and return 6", () => {
      expect(calculateRoomsIncome([1, 2, 3])).toBe(6);
    });

    it("should sum 123,234 and 345 and return 6", () => {
      expect(calculateRoomsIncome([123, 234, 345])).toBe(702);
    });

    it("should sum 12345,23456 and 34567 and return 6", () => {
      expect(calculateRoomsIncome([12345, 23456, 34567])).toBe(70368);
    });
  });

  describe("tests splitting guests into two groups based on payment will", () => {
    it("should return 3 premium and 0 economy guests", () => {
      const guests = [123, 100, 215];
      const { premium, economy } = splitGuestsIntoTwoGroups(guests);
      expect(premium).toHaveLength(3);
      expect(economy).toHaveLength(0);
    });

    it("should return 4 premium and 6 economy guests", () => {
      const guests = [123, 100, 215, 23, 99, 512, 57, 63, 12, 77];
      const { premium, economy } = splitGuestsIntoTwoGroups(guests);
      expect(premium).toHaveLength(4);
      expect(economy).toHaveLength(6);
    });

    it("should return 0 premium and 2 economy guests", () => {
      const guests = [12, 77];
      const { premium, economy } = splitGuestsIntoTwoGroups(guests);
      expect(premium).toHaveLength(0);
      expect(economy).toHaveLength(2);
    });
  });

  describe("tests economy guest upgrade process", () => {
    it("tests number of guests that will have upgrade based on available rooms and number of guests with potential upgrade", () => {
      expect(numberOfGuestsThatWillHaveUpgrade(2, 1)).toBe(1);
      expect(numberOfGuestsThatWillHaveUpgrade(2, 2)).toBe(2);
      expect(numberOfGuestsThatWillHaveUpgrade(1, 3)).toBe(1);
      expect(numberOfGuestsThatWillHaveUpgrade(1, 3)).toBe(1);
    });

    it("tests if there is too few economy rooms for potential economy guests", () => {
      expect(numberOfGuestsExceedingEconomyCapacity(5, 4)).toBeGreaterThan(0);
      expect(numberOfGuestsExceedingEconomyCapacity(3, 5)).not.toBeGreaterThan(
        0
      );
      expect(numberOfGuestsExceedingEconomyCapacity(2, 2)).not.toBeGreaterThan(
        0
      );
    });
  });
});

describe("distribute guests suite", () => {
  describe("tests proper distribution of guests between room categories", () => {
    it("should place 3 premium guests in 3 premium rooms and 5 economy guests in 5 economy rooms", () => {
      const { premium, economy } = distributeGuests(guests, 3, 5);
      expect(premium).toEqual([374, 209, 155]);
      expect(economy).toEqual([99, 45, 23, 22]);
    });

    it("should place 2 premium guests in 2 premium rooms and 3 economy guests in 3 economy rooms", () => {
      const { premium, economy } = distributeGuests(guests, 2, 3);
      expect(premium).toEqual([374, 209]);
      expect(economy).toEqual([99, 45, 23]);
    });

    it("should place 6 premium guests in 8 premium rooms and 4 economy guests in 5 economy rooms", () => {
      const { premium, economy } = distributeGuests(guests, 8, 5);
      expect(premium).toEqual([374, 209, 155, 115, 101, 100]);
      expect(economy).toEqual([99, 45, 23, 22]);
    });

    it("should place 6 premium guest in 10 premium rooms and 4 economy guests in 3 premium (ugprade) and 1 economy room", () => {
      const { premium, economy } = distributeGuests(guests, 10, 1);
      expect(premium).toEqual([374, 209, 155, 115, 101, 100, 99, 45, 23]);
      expect(economy).toEqual([22]);
    });
  });
});

describe("core expected logic tests", () => {
  it("Test 1", () => {
    const freePremiumRooms = 3;
    const freeEconomyRooms = 3;

    const { premium, economy } = distributeGuests(
      guests,
      freePremiumRooms,
      freeEconomyRooms
    );
    expect(
      createFormattedStringSummaryForRoomCategory("Premium", premium)
    ).toBe("Usage Premium: 3 (EUR 738)");
    expect(
      createFormattedStringSummaryForRoomCategory("Economy", economy)
    ).toBe("Usage Economy: 3 (EUR 167)");
  });

  it("Test 2", () => {
    const freePremiumRooms = 7;
    const freeEconomyRooms = 5;

    const { premium, economy } = distributeGuests(
      guests,
      freePremiumRooms,
      freeEconomyRooms
    );
    expect(
      createFormattedStringSummaryForRoomCategory("Premium", premium)
    ).toBe("Usage Premium: 6 (EUR 1054)");
    expect(
      createFormattedStringSummaryForRoomCategory("Economy", economy)
    ).toBe("Usage Economy: 4 (EUR 189)");
  });

  it("Test 3", () => {
    const freePremiumRooms = 2;
    const freeEconomyRooms = 7;

    const { premium, economy } = distributeGuests(
      guests,
      freePremiumRooms,
      freeEconomyRooms
    );
    expect(
      createFormattedStringSummaryForRoomCategory("Premium", premium)
    ).toBe("Usage Premium: 2 (EUR 583)");
    expect(
      createFormattedStringSummaryForRoomCategory("Economy", economy)
    ).toBe("Usage Economy: 4 (EUR 189)");
  });

  it("Test 4", () => {
    const freePremiumRooms = 7;
    const freeEconomyRooms = 1;

    const { premium, economy } = distributeGuests(
      guests,
      freePremiumRooms,
      freeEconomyRooms
    );
    expect(
      createFormattedStringSummaryForRoomCategory("Premium", premium)
    ).toBe("Usage Premium: 7 (EUR 1153)");
    expect(
      createFormattedStringSummaryForRoomCategory("Economy", economy)
    ).toBe("Usage Economy: 1 (EUR 45)");
  });
});
