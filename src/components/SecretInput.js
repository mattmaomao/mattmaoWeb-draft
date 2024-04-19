import { useEffect, useState } from "react";

export function SecretInput(secretStr, callback) {
  const [entered, setEntered] = useState("");

  useEffect(() => {
    if (secretStr === undefined) return;
    
    const handleKeyDown = (event) => {
      const { key } = event;
      setEntered((prevKeys) => prevKeys + key);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (secretStr === undefined) return;

    if (entered.endsWith(secretStr)) {
      callback();
      setEntered("");
    }
  }, [entered, secretStr, callback]);

  return;
}
