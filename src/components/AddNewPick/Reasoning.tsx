import React, { FC } from "react";
import { UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { CgCheck } from "react-icons/cg";
import { BetEntity } from "../../types";

interface Props {
  watch: UseFormWatch<BetEntity>;
  reasoningRegister: UseFormRegisterReturn;
}

const Reasoning: FC<Props> = ({ watch, reasoningRegister }) => {
  const validReasoningField =
    // @ts-ignore
    watch("reasoning") && watch("reasoning")!.length > 3;

  return (
    <div className="form-field w-full md:py-3">
      <h1 className="font-Basic tracking-tight text-3xl pt-6 pb-4 text-primary dark:text-white">
        Reasoning.
      </h1>

      <div className="relative flex flex-row items-center">
        <textarea
          autoComplete="off"
          className={`relative resize w-full py-2 md:py-2 pl-3 my-2 md:my-4 text-left bg-white border-[1px] border-gray-200 md:border-0 rounded-lg shadow-md focus:outline-black min-h-[5rem] min-w-full max-w-full ${
            !validReasoningField && "animate-pulse"
          }`}
          placeholder="Your reasoning (optional)"
          {...reasoningRegister}
        />
        {validReasoningField && (
          <CgCheck className="absolute text-green-500 text-3xl right-1 top-5 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export { Reasoning };
