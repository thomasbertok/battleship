import React, { useState, useRef } from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./CoordsInput.module.css";

/**
 * text input for player coords
 */

const CoordsInput = () => {
  const coordsInput = useRef();

  const [board, playerInput, setPlayerInput, setBoardCell] = useAppStore(
    useShallow((state) => [state.board, state.playerInput, state.setPlayerInput, state.setBoardCell])
  );

  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);

  // writing things in the textinput
  const handleInputChange = (event) => {
    const input = event.target.value.toUpperCase();
    setInputText(input);
    const isOk = isValidCoord(board, input);
    setIsValidInput(isOk);
    // update global state
    isOk ? setPlayerInput(input) : setPlayerInput("");
  };

  // submit coords
  const handleSubmit = (event) => {
    event.preventDefault();
    // if the coords are valid
    if (isValidInput) {
      console.log(">> You hit:", playerInput);
      // create coords
      const [row, col] = convertInputToCoords(playerInput);
      // update board
      setBoardCell(row, col, board[row][col] + 1);
      // reset input text
      setInputText("");
      setPlayerInput("");
    } else {
      setMessage("Invalid coordinates");
    }
    coordsInput.current.focus();
  };

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor="coords">
        Enter your coordinates:
      </label>
      <form className={`${styles.formBlock} ${isValidInput ? styles.validForm : null}`} onSubmit={handleSubmit}>
        <input
          ref={coordsInput}
          tabIndex={0}
          className={styles.input}
          type="text"
          name="coords"
          id="coords"
          onChange={handleInputChange}
          placeholder="Ex. A1"
          value={inputText}
          maxLength="3"
          autoFocus
          autoComplete="off"
        />
        <button type="submit" className={styles.button} disabled={!isValidInput}>
          &#187;
        </button>
      </form>
      <p className={styles.error}>{message}</p>
    </div>
  );
};

// check if input text is a valid coord (A1 - J10)
// check if coord is already hit
const isValidCoord = (board, input) => {
  // input has the right format
  const inputIsOk = /^[A-J]([1-9]|10)$/.test(input);
  if (!inputIsOk) return false;
  // convert to coords
  const [row, col] = convertInputToCoords(input);
  // cell is not miss or hit
  return board[row][col] !== 1 && board[row][col] !== 3;
};

// convert input text to array coords
const convertInputToCoords = (input) => {
  // first char is A-J
  const letter = input[0];
  // second char is 1-10
  const number = input.substring(1, input.length);
  // convert to coords
  return [number - 1, letter.charCodeAt(0) - 65];
};

export default CoordsInput;
