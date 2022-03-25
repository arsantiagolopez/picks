import React, { FC, useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import axios from "../../axios";
import { BetEntity } from "../../types";
import { EventDetails } from "./EventDetails";
import { Reasoning } from "./Reasoning";
import { SportSelect } from "./SportSelect";
import { TournamentDetails } from "./TournamentDetails";
import { Wager } from "./Wager";

interface Props {}

const AddNewPick: FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [helperMessage, setHelperMessage] = useState<string | null>(null);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    watch,
    resetField,
    setValue,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<BetEntity>({
    defaultValues: {
      sport: process.env.NEXT_PUBLIC_PREFERRED_SPORT,
    },
  });

  const toggleMessage = (message?: string) => {
    setShowUpdate(true);
    if (message) setHelperMessage(message);
    setTimeout(() => {
      setShowUpdate(false);
      if (message) setHelperMessage(null);
    }, 2000);
  };

  // Handle submit
  const onSubmit = async (values: BetEntity) => {
    setIsLoading(true);

    // Update values
    let { stake, reasoning } = values;

    stake = Number(stake);
    reasoning = reasoning === "" ? undefined : reasoning;

    values = { ...values, stake, reasoning };

    // Create bet
    const { status } = await axios.post("/api/bets", { ...values });

    if (status !== 200) {
      toggleMessage("Bet could not be created. Try again later.");
      return console.log("Bet could not be created");
    }

    toggleMessage("Bet successfully created!");
    setIsLoading(false);
    reset();
  };

  // Form fields registration
  // @ts-ignore
  const tournamentNameRegister: UseFormRegisterReturn = register(
    "tournamentName",
    {
      required:
        watch("sport") === "tennis"
          ? "What is the tennis tournament name?"
          : false,
    }
  );
  const homeRegister: UseFormRegisterReturn = register("home", {
    required:
      watch("sport") !== "multi" ? "The home field is required." : false,
  });
  const awayRegister: UseFormRegisterReturn = register("away", {
    required:
      watch("sport") !== "multi" ? "The away field is required." : false,
  });
  const wagerRegister: UseFormRegisterReturn = register("wager", {
    required: "The wager field is required.",
  });
  const stakeRegister: UseFormRegisterReturn = register("stake", {
    required: "The stake units field is required.",
  });
  const reasoningRegister: UseFormRegisterReturn = register("reasoning");

  // Register tennis required fields
  useEffect(() => {
    register("tournament", {
      required:
        watch("sport") === "tennis" ? "What is the tennis tour type?" : false,
    });
  }, [watch("sport")]);

  // Register remaining required fields
  useEffect(() => {
    register("startTime", {
      required: "The start time of the event is required.",
    });
    register("odds", {
      required: "What are the odds of the wager?",
    });
  }, []);

  const sportSelectProps = { setValue, watch };
  const tournamentDetailsProps = { setValue, watch, tournamentNameRegister };
  const eventDetailsProps = { setValue, watch, homeRegister, awayRegister };
  const wagerProps = {
    setValue,
    watch,
    resetField,
    wagerRegister,
    stakeRegister,
  };
  const reasoningProps = { watch, reasoningRegister };

  return (
    <div className="flex flex-col w-full py-16 md:py-20">
      <h1 className="font-Basic text-primary text-4xl md:text-5xl tracking-tighter">
        Add a new pick
      </h1>

      <form
        // @ts-ignore
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full py-6 md:py-10"
      >
        {/* Sport */}
        <SportSelect {...sportSelectProps} />

        {/* Tournament Details */}
        <TournamentDetails {...tournamentDetailsProps} />

        {/* Event Details */}
        <EventDetails {...eventDetailsProps} />

        {/* Wager */}
        <Wager {...wagerProps} />

        {/* Reasoning */}
        <Reasoning {...reasoningProps} />

        <button
          type="submit"
          disabled={isLoading}
          className={`flex flex-row justify-center items-center mt-12 py-3 px-10 font-Basic text-white tracking-wider rounded-full shadow-xl ${
            Object.keys(errors)?.length
              ? "bg-red-600 animate-pulse"
              : "bg-primary"
          }`}
        >
          {showUpdate ? (
            <span className="animate-pulse">{helperMessage}</span>
          ) : (
            <span className="flex flex-row items-center">
              {Object.keys(errors)?.length && isSubmitted ? (
                // @ts-ignore
                <>{errors[Object.keys(errors)[0]]?.message}</>
              ) : (
                <>
                  Create pick
                  <CgCheck className="text-2xl ml-2" />
                </>
              )}
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export { AddNewPick };
