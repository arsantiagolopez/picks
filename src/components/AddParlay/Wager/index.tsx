import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import {
  UseFormRegisterReturn,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import { GoPlus } from "react-icons/go";
import { OddsEntity, ParlayBetEntity } from "../../../types";
import { WagerOdds } from "./WagerOdds";

interface Props {
  setValue: UseFormSetValue<ParlayBetEntity>;
  watch: UseFormWatch<ParlayBetEntity>;
  resetField: UseFormResetField<ParlayBetEntity>;
  stakeRegister: UseFormRegisterReturn;
  defaultOdds?: OddsEntity;
  isUpdate?: boolean;
}

interface ParlayLeg {
  id: number;
  placeholder: string;
  value: string;
}

const Wager: FC<Props> = ({
  setValue,
  watch,
  resetField,
  stakeRegister,
  defaultOdds,
  isUpdate,
}) => {
  const initialLegs = [
    { id: 1, placeholder: "Leg 1", value: "" },
    { id: 2, placeholder: "Leg 2", value: "" },
  ];

  const [legs, setLegs] = useState<ParlayLeg[]>(initialLegs);

  console.log(legs);

  // Add an extra leg
  const handleAddLeg: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setLegs([
      ...legs,
      { id: legs.length + 1, placeholder: `Leg ${legs.length + 1}`, value: "" },
    ]);
  };

  // Change spceific leg
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { id, value } = event.target;
    const updated = legs.map((leg) => {
      if (String(leg.id) === id) return { ...leg, value };
      return leg;
    });
    setLegs(updated);
  };

  // Concatenate legs into string & setValue
  useEffect(() => {
    if (legs.length) {
      const wager = legs
        .filter(({ value }) => value !== "")
        .map(({ value }) => value)
        .join(" / ");
      setValue("wager", wager);
    }
  }, [legs]);

  // Update existing parlay legs if attempting an update
  useEffect(() => {
    if (isUpdate && watch("wager")) {
      // Current state legs in string version
      const strLegs = legs.map(({ value }) => value).join(" / ");

      // If watch("wager") already populated, attempting an update
      // Populate current state with existing legs
      if (watch("wager") !== strLegs) {
        const updatedLegs = watch("wager")
          .split(" / ")
          .map((leg, index) => ({
            id: index + 1,
            placeholder: `Leg ${index + 1}`,
            value: leg,
          }));
        setLegs(updatedLegs);
      }
    }
    //@ts-ignore
  }, [isUpdate, watch("wager")]);

  // @ts-ignore
  const validStakeField = Number(watch("stake")) > 0;

  const wagerOddsProps = { setValue, resetField, defaultOdds };

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-Basic tracking-tight text-3xl pt-6 pb-4 text-primary dark:text-white">
        Legs.
      </h1>

      {/* Legs */}
      <div className="form-field w-full md:py-3">
        <div className="relative flex flex-col items-center">
          {legs.map(({ id, placeholder, value }) => (
            <input
              id={String(id)}
              key={id}
              value={value}
              onChange={handleChange}
              spellCheck={false}
              autoComplete="off"
              placeholder={placeholder}
              className="relative w-full py-2 pl-3 pr-8 my-2 md:my-4 text-left bg-white border-[1px] border-gray-200 md:border-0 rounded-lg shadow-md focus:outline-black"
            />
          ))}

          <button
            type="button"
            onClick={handleAddLeg}
            className="button flex flex-row items-center self-start px-6 py-2 mt-2"
          >
            Add a leg <GoPlus className="text-sm text-white ml-2" />
          </button>
        </div>
      </div>

      <h1 className="font-Basic tracking-tight text-3xl pt-6 pb-4 text-primary dark:text-white">
        Odds & units.
      </h1>

      {/* Odds */}
      <WagerOdds {...wagerOddsProps} />

      {/* Stake */}
      <div className="form-field w-full md:py-3">
        <div className="relative flex flex-row items-center">
          <input
            type="number"
            placeholder="How many units?"
            className={`relative w-full py-2 pl-3 pr-8 my-2 md:my-4 text-left bg-white border-[1px] border-gray-200 md:border-0 rounded-lg shadow-md focus:outline-black ${
              !validStakeField && "animate-pulse pr-0"
            }`}
            {...stakeRegister}
          />
          {validStakeField && (
            <CgCheck className="absolute text-green-500 text-3xl right-1 pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};

export { Wager };
