import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { ParlayBetEntity } from "../../../types";

interface TimeOption {
  label: string;
  value: Date;
}

interface DayOption {
  label: string;
  value: string;
}

interface Props {
  setValue: UseFormSetValue<ParlayBetEntity>;
  defaultStartTime?: Date;
}

const TimePicker: FC<Props> = ({ setValue, defaultStartTime }) => {
  const dayOptions: DayOption[] = [
    { label: "Tomorrow", value: "tomorrow" },
    { label: "Today", value: "today" },
  ];

  const [selectedDay, setSelectedDay] = useState<DayOption>(dayOptions[0]);
  const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);

  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([]);

  // Create time options for React Select
  useEffect(() => {
    let intervals = [];

    for (let hour = 0; hour < 24; hour++) {
      intervals.push(moment({ hour }).format("h:mm A"));
      intervals.push(
        moment({
          hour,
          minute: 15,
        }).format("h:mm A")
      );
      intervals.push(
        moment({
          hour,
          minute: 30,
        }).format("h:mm A")
      );
      intervals.push(
        moment({
          hour,
          minute: 45,
        }).format("h:mm A")
      );
    }

    const options = intervals.map((interval) => ({
      label: interval,
      value: moment(interval, ["h:mm A"]).toDate(),
    }));

    setTimeOptions(options);
  }, []);

  // Update form state on new selection
  useEffect(() => {
    if (selectedDay && selectedTime) {
      const date = selectedTime.value;
      const startTime =
        selectedDay.value === "today"
          ? date
          : moment(date).add(1, "day").toDate();

      // @ts-ignore
      setValue("startTime", startTime);
    }
  }, [selectedDay, selectedTime]);

  // Set default values for updates
  useEffect(() => {
    if (timeOptions && defaultStartTime) {
      const tomorrow = moment().add(1, "day");
      const isTomorrow = moment(defaultStartTime).isSame(tomorrow, "day");

      // Set selected day
      if (isTomorrow) {
        setSelectedDay(dayOptions[0]);
      } else {
        setSelectedDay(dayOptions[1]);
      }

      // Set selected time
      const selectedOption = timeOptions.find((option) => {
        const startTime = isTomorrow
          ? moment(defaultStartTime).subtract(1, "day").format("h:mm A")
          : moment(defaultStartTime, ["h:mm A"]).format("h:mm A");

        return startTime === option.label;
      });

      if (selectedOption) {
        setSelectedTime(selectedOption);
      }
      setValue("startTime", defaultStartTime);
    }
  }, [timeOptions, defaultStartTime]);

  return (
    <div className="flex flex-row w-full py-6">
      <Select
        instanceId="day-id"
        defaultValue={selectedDay}
        placeholder={defaultStartTime ? selectedDay?.label : "Tomorrow"}
        // @ts-ignore
        onChange={setSelectedDay}
        options={dayOptions}
        styles={customStyles}
        className="w-full md:w-[16rem] mr-4"
      />
      <Select
        instanceId="time-id"
        defaultValue={selectedTime}
        placeholder={defaultStartTime ? selectedTime?.label : "Start time"}
        // @ts-ignore
        onChange={setSelectedTime}
        options={timeOptions}
        styles={customStyles}
        className="w-full"
      />
    </div>
  );
};

export { TimePicker };

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
