import React, { FC, useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import axios from "../../axios";
import { ParlayBetEntity } from "../../types";
import { EventDetails } from "./EventDetails";
import { Reasoning } from "./Reasoning";
import { Wager } from "./Wager";

interface Props {}

const AddParlay: FC<Props> = () => {
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
  } = useForm<ParlayBetEntity>();

  const toggleMessage = (message?: string) => {
    setShowUpdate(true);
    if (message) setHelperMessage(message);
    setTimeout(() => {
      setShowUpdate(false);
      if (message) setHelperMessage(null);
    }, 2000);
  };

  // Handle submit
  const onSubmit = async (values: ParlayBetEntity) => {
    setIsLoading(true);

    // Update values
    let { stake, reasoning } = values;

    stake = Number(stake);
    reasoning = reasoning === "" ? undefined : reasoning;

    values = { ...values, stake, reasoning };

    // Create bet
    const { status } = await axios.post("/api/parlayBets", { ...values });

    if (status !== 200) {
      toggleMessage("Bet could not be created. Try again later.");
      return console.log("Bet could not be created");
    }

    toggleMessage("Parlay successfully created!");
    setIsLoading(false);
    reset();
  };

  // Form fields registration
  // @ts-ignore
  const stakeRegister: UseFormRegisterReturn = register("stake", {
    required: "The stake units field is required.",
  });
  const reasoningRegister: UseFormRegisterReturn = register("reasoning");

  // Register remaining required fields
  useEffect(() => {
    register("wager", {
      required: "The wager field is required.",
    });
    register("startTime", {
      required: "The start time of the event is required.",
    });
    register("odds", {
      required: "What are the odds of the wager?",
    });
  }, []);

  const eventDetailsProps = { setValue };
  const wagerProps = {
    setValue,
    watch,
    resetField,
    stakeRegister,
  };
  const reasoningProps = { watch, reasoningRegister };

  return (
    <div className="flex flex-col w-full py-16 md:py-20">
      <h1 className="font-Basic text-primary dark:text-white text-4xl md:text-5xl tracking-tighter">
        Create parlay
      </h1>

      <form
        // @ts-ignore
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full py-6 md:py-10"
      >
        {/* Event Details */}
        <EventDetails {...eventDetailsProps} />

        {/* Wager */}
        <Wager {...wagerProps} />

        {/* Reasoning */}
        <Reasoning {...reasoningProps} />

        <button
          type="submit"
          disabled={isLoading}
          className={`button flex flex-row justify-center items-center mt-12 py-3 px-10 font-Basic rounded-full shadow-xl ${
            Object.keys(errors)?.length ? "bg-red-600 animate-pulse" : ""
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
                  Create parlay
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

export { AddParlay };
