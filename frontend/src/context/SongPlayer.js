import React, { useRef, useState, useEffect } from "react";

const SongPlayerContext = React.createContext();

export function ModalProvider({ children }) {
  const songPlayerRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(songPlayerRef.current);
  }, []);

  return (
    <>
      <SongPlayerContext.Provider value={value}>
        {children}
      </SongPlayerContext.Provider>
      <div ref={songPlayerRef} />
    </>
  );
}
