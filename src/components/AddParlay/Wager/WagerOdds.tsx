import React, { FC, useContext, useEffect, useState } from "react";
import { UseFormResetField, UseFormSetValue } from "react-hook-form";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { PreferencesContext } from "../../../context/PreferencesContext";
import { OddsEntity, ParlayBetEntity } from "../../../types";

interface Props {
  setValue: UseFormSetValue<ParlayBetEntity>;
  resetField: UseFormResetField<ParlayBetEntity>;
  defaultOdds?: OddsEntity;
}

const WagerOdds: FC<Props> = ({ setValue, resetField, defaultOdds }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const { oddsFormat, setOddsFormat } = useContext(PreferencesContext);

  const validOddsField = inputValue.length > 0;

  const toggleOddsFormat = () => {
    setInputValue("");
    setOddsFormat(oddsFormat === "american" ? "decimal" : "american");
  };

  // Convert odds to decimal format
  const convertToDecimal = (odds: string): number => {
    let number = Number(odds);

    if (number > 0) {
      number = Number(odds) / 100 + 1;
    } else {
      number = 100 / (Number(odds) * -1) + 1;
    }

    return Number(number.toFixed(2));
  };

  // Convert odds to american format
  const convertToAmerican = (odds: string) => {
    let number = Number(odds);

    if (number >= 2) {
      number = (number - 1) * 100;
    } else if (number > 1 && number < 2) {
      number = -100 / (number - 1);
    }

    return parseInt(String(number));
  };

  // Get values of both American & Decimal formats
  const convertOdds = (odds: string, format: string): OddsEntity => {
    let decimal: number;
    let american: number;

    if (format === "decimal") {
      decimal = Number(odds);
      american = convertToAmerican(odds);
    } else {
      american = Number(odds);
      decimal = convertToDecimal(odds);
    }

    return { decimal, american };
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const odds = target.value;

    setInputValue(odds);

    const { american, decimal } = convertOdds(odds, oddsFormat);

    // Update form
    // @ts-ignore
    setValue("odds", { american, decimal });
  };

  useEffect(() => {
    if (inputValue === "") {
      resetField("odds");
    }
  }, [inputValue]);

  // Set default values for updates
  useEffect(() => {
    if (defaultOdds) {
      const { american, decimal } = defaultOdds;

      setInputValue(String(american));

      // @ts-ignore
      setValue("odds", { american, decimal });
    }
  }, [defaultOdds]);

  return (
    <div className="form-field w-full">
      <div className="relative flex flex-row items-center">
        <input
          type="number"
          placeholder={`${oddsFormat} odds`}
          value={inputValue}
          onChange={handleChange}
          className={`relative capitalize w-full py-2 pl-3 pr-8 my-2 md:my-4 text-left bg-white border-[1px] border-gray-200 md:border-0 rounded-lg shadow-md focus:outline-black ${
            !validOddsField && "animate-pulse pr-0"
          }`}
        />
        <div className="absolute right-1 cursor-pointer">
          <CgArrowsExchangeAltV
            onClick={toggleOddsFormat}
            className={`text-3xl hover:text-primary ${
              validOddsField ? "text-green-500" : "text-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export { WagerOdds };
