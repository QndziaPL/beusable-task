import {
  isPremiumGuest,
  sortNumbersDescending,
  splitGuestsIntoTwoGroups,
} from "./helpers";

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
});
