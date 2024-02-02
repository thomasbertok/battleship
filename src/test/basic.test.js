/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import Stats from "../components/Stats";
import Board from "../components/Board";
import CoordsInput from "../components/CoordsInput";

describe("Dashboard", () => {
  it("Dashboard renders correctly.", () => {
    const dashboard = render(<Dashboard />);
    expect(dashboard).toBeDefined();
  });

  it("Board renders correctly", () => {
    const board = render(<Board battleField={{ rows: 10, cols: 10 }} />);
    expect(board).toBeDefined();
  });

  it("Stats renders correctly", () => {
    const statsBlock = render(<Stats />);
    expect(statsBlock).toMatchSnapshot();
  });

  it("Input renders correctly", () => {
    const inputBlock = render(<CoordsInput />);
    expect(inputBlock).toMatchSnapshot();
  });
});
