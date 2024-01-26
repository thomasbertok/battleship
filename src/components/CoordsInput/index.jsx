import React, { useState } from "react";
import styles from "./CoordsInput.module.css";

const CoordsInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
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
        value={value}
      />
    </div>
  );
};

export default CoordsInput;
