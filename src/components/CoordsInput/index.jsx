import { useAppStore } from "../../store";
import styles from "./CoordsInput.module.css";

const CoordsInput = () => {
  const [playerInput, setPlayerInput] = useAppStore((state) => [state.playerInput, state.setPlayerInput]);

  const handleChange = (event) => {
    setPlayerInput(event.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor="coords">
        Enter your coordinates:
      </label>
      <input
        tabIndex={1}
        className={styles.input}
        type="text"
        name="coords"
        id="coords"
        onChange={handleChange}
        placeholder="Ex. A1"
        value={playerInput}
      />
    </div>
  );
};

export default CoordsInput;
