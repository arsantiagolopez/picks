import moment from "moment-timezone";
import React, { FC, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import useSWR from "swr";
import axios from "../../axios";
import { UserEntity } from "../../types";
import { refreshScreen } from "../../utils/refreshScreen";

interface TimeOption {
  label: string;
  value: Date;
}

interface Props {}

const SelectPotdTime: FC<Props> = () => {
  const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);
  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([]);
  const [userSelectedTime, setUserSelectedTime] = useState<TimeOption | null>(
    null
  );

  const { data: user, mutate } = useSWR<UserEntity>("/api/users/");

  // Update user entity
  const updateUser = async (time: TimeOption | null) => {
    const potdReleaseTime = time?.value;

    const { data, status } = await axios.put("/api/users", { potdReleaseTime });

    if (status !== 200) {
      console.log("POTD release time could not be updated...");
      return;
    }

    mutate({ ...data, potdReleaseTime });
    refreshScreen();
  };

  // Create time options for React Select
  useEffect(() => {
    let intervals = [];

    for (let hour = 0; hour < 24; hour++) {
      intervals.push(moment({ hour }).format("h:mm A"));
      intervals.push(
        moment({
          hour,
          minute: 30,
        }).format("h:mm A")
      );
    }

    const options = intervals.map((interval) => ({
      label: interval,
      value: moment(interval, ["h:mm A"]).toDate(),
    }));

    setTimeOptions(options);
  }, []);

  // Set selected time to user's preferences
  useEffect(() => {
    if (user && timeOptions && !userSelectedTime) {
      const { potdReleaseTime } = user;

      const potdTimeOption = timeOptions.find(
        ({ label }) =>
          label ===
          moment(potdReleaseTime).tz("America/Chicago").format("h:mm A")
      );

      if (potdTimeOption) {
        setUserSelectedTime(potdTimeOption);
        setSelectedTime(potdTimeOption);
      }
    }
  }, [user, timeOptions]);

  // Update time in database
  useEffect(() => {
    if (userSelectedTime && userSelectedTime !== selectedTime) {
      updateUser(selectedTime);
    }
  }, [userSelectedTime, selectedTime]);

  return (
    <div className="w-full pt-10">
      <h1 className="font-Basic tracking-tight text-2xl md:text-3xl pb-4 text-primary">
        What time should your picks be released?
      </h1>

      <Select
        instanceId={1}
        defaultValue={selectedTime}
        placeholder={userSelectedTime?.label}
        // @ts-ignore
        onChange={setSelectedTime}
        options={timeOptions}
        styles={customStyles}
        className="w-full"
      />
    </div>
  );
};

export { SelectPotdTime };

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
