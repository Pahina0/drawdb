import { describe, it, expect } from "vitest";
import { defaultTypes } from "./datatypes";

describe("MYPRIMETYPE checkDefault", () => {
  const myPrimeType = defaultTypes.MYPRIMETYPE;

  it("should validate positive odd numbers (1, 3, 5, 7, 9, 11, ...)", () => {
    expect(myPrimeType.checkDefault({ default: "1" })).toBe(true);
    expect(myPrimeType.checkDefault({ default: "3" })).toBe(true);
    expect(myPrimeType.checkDefault({ default: "5" })).toBe(true);
    expect(myPrimeType.checkDefault({ default: "7" })).toBe(true);
    expect(myPrimeType.checkDefault({ default: "9" })).toBe(true);
    expect(myPrimeType.checkDefault({ default: "11" })).toBe(true);
    expect(myPrimeType.checkDefault({ default: "101" })).toBe(true);
  });

  it("should invalidate even numbers", () => {
    expect(myPrimeType.checkDefault({ default: "2" })).toBe(false);
    expect(myPrimeType.checkDefault({ default: "4" })).toBe(false);
    expect(myPrimeType.checkDefault({ default: "10" })).toBe(false);
  });

  it("should invalidate non-positive numbers", () => {
    expect(myPrimeType.checkDefault({ default: "0" })).toBe(false);
    expect(myPrimeType.checkDefault({ default: "-1" })).toBe(false);
    expect(myPrimeType.checkDefault({ default: "-3" })).toBe(false);
  });

  it("should invalidate non-numeric strings", () => {
    expect(myPrimeType.checkDefault({ default: "abc" })).toBe(false);
    expect(myPrimeType.checkDefault({ default: "" })).toBe(false);
    expect(myPrimeType.checkDefault({ default: " " })).toBe(false);
  });
});
