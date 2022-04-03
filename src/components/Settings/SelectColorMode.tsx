import React, { FC, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import useSWR from "swr";
import axios from "../../axios";
import { UserEntity } from "../../types";
import { refreshScreen } from "../../utils/refreshScreen";

interface Option {
  label: string;
  value: string;
}

interface Props {}

const SelectColorMode: FC<Props> = () => {
  const [selected, setSelected] = useState<Option | null>(null);
  const [userSelected, setUserSelected] = useState<Option | null>(null);

  const { data: user, mutate } = useSWR<UserEntity>("/api/users/");

  const options: Option[] = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
  ];

  // Update user entity
  const updateUser = async (option: Option | null) => {
    const defaultColorMode = option?.value;

    const { data, status } = await axios.put("/api/users", {
      defaultColorMode,
    });

    if (status !== 200) {
      console.log("Bets colored preference could not be updated...");
      return;
    }

    mutate({ ...data, defaultColorMode });
    refreshScreen();
  };

  // Set selected to user's preferences
  useEffect(() => {
    if (user && !userSelected) {
      const { defaultColorMode } = user;

      const option: Option = {
        label: defaultColorMode === "dark" ? "Dark" : "Light",
        value: defaultColorMode,
      };

      setUserSelected(option);
      setSelected(option);
    }
  }, [user]);

  // Update isBetsColored in database
  useEffect(() => {
    if (userSelected && userSelected !== selected) {
      updateUser(selected);
    }
  }, [userSelected, selected]);

  return (
    <div className="w-full pt-10">
      <h1 className="font-Basic tracking-tight text-2xl md:text-3xl pb-4 text-primary dark:text-white">
        What color theme do you want your users to default to?
      </h1>

      <Select
        instanceId={1}
        defaultValue={selected}
        placeholder={userSelected?.label}
        // @ts-ignore
        onChange={setSelected}
        options={options}
        styles={customStyles}
        className="w-full"
      />
    </div>
  );
};

export { SelectColorMode };

const customStyles: StylesConfig = {
  input: (provided) => ({
    ...provided,
    "input:focus": {
      boxShadow: "none",
    },
  }),
  // @ts-ignore
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.375rem",
    // Selected & State
    border: state.isFocused ? "2px solid #1A202C" : "0px",
    // Disables the blue border
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "&:hover": {
      boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#A0AEC0",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#302c2c" : "none",
    color: state.isFocused ? "white" : "#302c2c",
    "&:active": {
      backgroundColor: "black",
    },
  }),
};
