import { useState, useEffect } from "react";

function UseDebounce(value, delay = 500) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setState(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return state;
}

const useDebounce = (value, delay) => UseDebounce(value, delay);
export default useDebounce;
