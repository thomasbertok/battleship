import { describe, expect, it } from "vitest";
import BattleField from "../utils/BattleField";

describe("BattleField", () => {
  it("returns correct ocean size", () => {
    const bf = new BattleField(10, 10);
    expect(bf.ocean.length).toBe(10);
  });
  it("creates ships", () => {
    const bf = new BattleField(10, 10);
    expect(bf.fleet.length).toBe(3);
  });
});
