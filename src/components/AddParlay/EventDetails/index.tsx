import React, { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { ParlayBetEntity } from "../../../types";
import { TimePicker } from "./TimePicker";

interface Props {
  setValue: UseFormSetValue<ParlayBetEntity>;
  defaultStartTime?: Date;
}

const EventDetails: FC<Props> = ({ setValue, defaultStartTime }) => {
  const timePickerProps = { setValue, defaultStartTime };

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-Basic tracking-tight text-3xl pt-6 pb-4 text-primary dark:text-white">
        Event Details.
      </h1>

      {/* Event time */}
      <TimePicker {...timePickerProps} />
    </div>
  );
};

export { EventDetails };
