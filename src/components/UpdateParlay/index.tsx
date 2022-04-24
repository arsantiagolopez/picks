import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import { IoTrashOutline } from "react-icons/io5";
import useSWR from "swr";
import axios from "../../axios";
import { ParlayBetEntity } from "../../types";
import { EventDetails } from "../AddParlay/EventDetails";
import { Reasoning } from "../AddParlay/Reasoning";
import { Wager } from "../AddParlay/Wager";

interface Props {}

const UpdateParlay: FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [helperMessage, setHelperMessage] = useState<string | null>(null);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { data: wager } = useSWR<ParlayBetEntity>(
    id && `/api/parlayBets/${id}`
  );

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

  // Delete bet
  const handleDelete = async () => {
    const { status } = await axios.delete(`/api/parlayBets/${id}`);
    if (status !== 200) {
      return console.log("Could not delete your bet. Try again later.");
    }
    router.push("/");
  };

  const onSubmit = async (values: ParlayBetEntity) => {
    setIsLoading(true);

    // Update values
    let { stake, reasoning } = values;

    stake = Number(stake);
    reasoning = reasoning === "" ? undefined : reasoning;

    values = { ...values, stake, reasoning };

    // Create bet
    const { status } = await axios.put(`/api/parlayBets/${id}`, values);

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

  // Update default values after values fetched
  useEffect(() => {
    if (wager) {
      const { stake, reasoning } = wager as ParlayBetEntity;

      setValue("wager", wager?.wager);
      setValue("stake", stake);
      setValue("reasoning", reasoning);
    }
  }, [wager]);

  const defaultStartTime = wager?.startTime;
  const defaultOdds = wager?.odds;

  const eventDetailsProps = { setValue, defaultStartTime };
  const wagerProps = {
    setValue,
    watch,
    resetField,
    stakeRegister,
    defaultOdds,
    isUpdate: true,
  };
  const reasoningProps = { watch, reasoningRegister };

  return (
    <div className="flex flex-col w-full py-16 md:py-20">
      <h1 className="font-Basic text-primary dark:text-white text-4xl md:text-5xl tracking-tighter">
        Update your parlay
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
                  Update parlay
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
          Delete parlay
          <IoTrashOutline className="ml-2" />
        </div>
      </form>
    </div>
  );
};

export { UpdateParlay };
