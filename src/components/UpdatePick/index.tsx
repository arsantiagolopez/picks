import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import { IoTrashOutline } from "react-icons/io5";
import useSWR from "swr";
import axios from "../../axios";
import { BetEntity } from "../../types";
import { EventDetails } from "../AddNewPick/EventDetails";
import { Reasoning } from "../AddNewPick/Reasoning";
import { SportSelect } from "../AddNewPick/SportSelect";
import { TournamentDetails } from "../AddNewPick/TournamentDetails";
import { Wager } from "../AddNewPick/Wager";

interface Props {}

const UpdatePick: FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [helperMessage, setHelperMessage] = useState<string | null>(null);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { data: wager } = useSWR<BetEntity>(id && `/api/bets/${id}`);

  const {
    handleSubmit,
    register,
    watch,
    resetField,
    setValue,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<BetEntity>();

  const toggleMessage = (message?: string) => {
    setShowUpdate(true);
    if (message) setHelperMessage(message);
    setTimeout(() => {
      setShowUpdate(false);
      if (message) setHelperMessage(null);
    }, 2000);
  };

  // Delete bet
  const handleDelete = async () => {
    const { status } = await axios.delete(`/api/bets/${id}`);
    if (status !== 200) {
      return console.log("Could not delete your bet. Try again later.");
    }
    router.push("/");
  };

  const onSubmit = async (values: BetEntity) => {
    // setIsLoading(true);

    // Update values
    let { stake, reasoning } = values;

    stake = Number(stake);
    reasoning = reasoning === "" ? undefined : reasoning;

    values = { ...values, stake, reasoning };

    // Create bet
    const { status } = await axios.put(`/api/bets/${id}`, values);

    if (status !== 200) {
      toggleMessage("Bet could not be updated. Try again later.");
      return console.log("Bet could not be updated");
    }

    toggleMessage("Successful update!");
    setIsLoading(false);
    reset();

    // Redirect on success
    router.push("/");
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

  // Update default values after values fetched
  useEffect(() => {
    if (wager) {
      const { sport, tournamentName, home, away, stake, reasoning } =
        wager as BetEntity;

      setValue("sport", sport);
      setValue("tournamentName", tournamentName);
      setValue("home", home);
      setValue("away", away);
      setValue("wager", wager?.wager);
      setValue("stake", stake);
      setValue("reasoning", reasoning);
    }
  }, [wager]);

  const defaultTournament = wager?.tournament;
  const defaultStartTime = wager?.startTime;
  const defaultOdds = wager?.odds;

  const sportSelectProps = { setValue, watch };
  const tournamentDetailsProps = {
    setValue,
    watch,
    tournamentNameRegister,
    defaultTournament,
  };
  const eventDetailsProps = {
    setValue,
    watch,
    homeRegister,
    awayRegister,
    defaultStartTime,
  };
  const wagerProps = {
    setValue,
    watch,
    resetField,
    wagerRegister,
    stakeRegister,
    defaultOdds,
  };
  const reasoningProps = { watch, reasoningRegister };

  return (
    <div className="flex flex-col w-full py-16 md:py-20">
      <h1 className="font-Basic text-primary text-4xl md:text-5xl tracking-tighter">
        Update your pick
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
                  Update pick
                  <CgCheck className="text-2xl ml-2" />
                </>
              )}
            </span>
          )}
        </button>
        <div
          onClick={handleDelete}
          className="flex flex-row justify-center items-center mt-4 py-3 px-10 font-Basic text-white tracking-wider rounded-full shadow-xl bg-red-600"
        >
          Delete pick
          <IoTrashOutline className="ml-2" />
        </div>
      </form>
    </div>
  );
};

export { UpdatePick };
