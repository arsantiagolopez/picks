import React, { FC, useContext, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { PreferencesContext } from "../../context/PreferencesContext";

interface Props {}

const ToggleColorMode: FC<Props> = () => {
  const [scaleOut, setScaleOut] = useState(false);

  const { colorMode, toggleColorMode } = useContext(PreferencesContext);

  const handleTransition = async () => {
    setScaleOut(true);

    // Toggle color theme
    setTimeout(() => {
      toggleColorMode();
      setScaleOut(false);
    }, 150);
  };
  return (
    <div className="flex flex-row justify-center items-center mx-2 md:mx-4 cursor-pointer select-none">
      <div onClick={handleTransition}>
        {colorMode === "dark" ? (
          <FaMoon
            className={`text-lg md:text-xl select-none transition-all dark:text-fourth ${
              scaleOut && "animate-ping"
            }`}
          />
        ) : (
          <IoIosSunny
            className={`text-xl md:text-2xl select-none transition-all dark:text-fourth ${
              scaleOut && "animate-ping"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export { ToggleColorMode };
