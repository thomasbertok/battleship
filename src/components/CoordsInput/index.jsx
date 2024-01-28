import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./CoordsInput.module.css";

const CoordsInput = () => {
  const [playerInput, setPlayerInput] = useAppStore(useShallow((state) => [state.playerInput, state.setPlayerInput]));

  const isValidCoord = (input) => {
    // return /^[A-J, 0-9]$/.test(input);
    return true;
  };

  const handleChange = (event) => {
    const input = event.target.value.toUpperCase();
    if (isValidCoord(input)) {
      setPlayerInput(input);
    }
  };

  const handleKeyUp = (event) => {};

  const handleClick = () => {};

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor="coords">
        Enter your coordinates:
      </label>
      <div className={styles.formBlock}>
        <input
          tabIndex={1}
          className={styles.input}
          type="text"
          name="coords"
          id="coords"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="Ex. A1"
          value={playerInput}
        />
        <button type="submit" className={styles.button} onClick={handleClick}>
          &#187;
        </button>
      </div>
    </div>
  );
};

export default CoordsInput;
