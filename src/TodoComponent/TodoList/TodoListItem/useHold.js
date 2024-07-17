import { useRef } from "react";

function useHold(func, delay) {
  const locked = useRef(false);
  const timeout = useRef(null);
  const isHolded = useRef(false);
  const isHoldedPreventClick = useRef(false);
  function onPointerDown() {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (locked.current) return;
      func();
      isHolded.current = true;
      isHoldedPreventClick.current = true;
    }, delay);
  }
  function onPointerUp() {
    clearTimeout(timeout.current);
    isHolded.current = false;
  }
  const onClick = {
    then(func) {
      return function (e) {
        const holded = isHoldedPreventClick.current;
        isHoldedPreventClick.current = false;
        if (holded) return;
        func(e);
      };
    },
  };
  function setLocked(value) {
    locked.current = !!value;
    if (value) clearTimeout(timeout.current);
  }

  return {
    onPointerDown,
    onPointerUp,
    onClick,
    setLocked,
  };
}

export default useHold;
