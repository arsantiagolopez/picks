import React, { FC, useEffect, useState } from "react";
import { IntervalSelect } from "./IntervalSelect";

interface Props {
  weekProfit: number;
  monthProfit: number;
  yearProfit: number;
  allProfit: number;
}

const Projections: FC<Props> = ({
  weekProfit,
  monthProfit,
  yearProfit,
  allProfit,
}) => {
  const [selectedInterval, setSelectedInterval] = useState<string>("week");
  const [inputValue, setInputValue] = useState<string>("100");
  const [multiplier, setMultiplier] = useState<number>(weekProfit);

  const options: string[] = ["week", "month", "year", "forever"];

  const handleSelect = (option: string) => setSelectedInterval(option);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (Number(target.value) < 10000000000000) {
      setInputValue(target.value);
    }
  };

  const getEmojiText = (): string => {
    const stake = Number(inputValue);

    const isZero = stake === 0;
    const isSmall = stake < 15;
    const isMid = stake < 150;
    const isLarge = stake < 1500;
    const isMillionaire = stake < 15000;
    const isBillionaire = stake < 150000;
    const isGod = stake > 150000;

    if (isZero) return "❓ + 🌽 = ⁉️";
    if (isSmall) return "💵 + 🌽 = 💵";
    if (isMid) return "💵 + 🌽 = 💵💵";
    if (isLarge) return "💵 + 🌽 = 💵💵💵";
    if (isMillionaire) return "💵 + 🌽 = 💵🏎️";
    if (isBillionaire) return "💵💵 + 🌽 = 🏎️🏠";
    if (isGod) return "💵💵 + 🌽 = 🏎️🏠💁‍♀️";
    else return "";
  };

  const returns = (multiplier * Number(inputValue)).toLocaleString();
  const emojiText = getEmojiText();

  // Update multiplier
  useEffect(() => {
    let times = 1;

    switch (selectedInterval) {
      case "week":
        times = weekProfit;
        break;
      case "month":
        times = monthProfit;
        break;
      case "year":
        times = yearProfit;
        break;
      case "forever":
        times = allProfit;
        break;
    }

    setMultiplier(times);
  }, [selectedInterval]);

  const intervalSelectProps = {
    options,
    selected: selectedInterval,
    handleSelect,
  };

  return (
    <div className="h-full min-h-[50vh]">
      <h1 className="font-Basic text-4xl md:text-5xl font-bold tracking-tighter md:tracking-tight">
        Where would you be if you tailed...
      </h1>

      <div className="flex flex-row justify-start items-center py-2">
        <div className="flex flex-row items-center py-6 md:py-12 text-tertiary">
          <p>a</p>
          <IntervalSelect {...intervalSelectProps} />
          <p className="min-w-[50%]">ago with</p>
        </div>
        <input
          value={inputValue}
          onChange={handleChange}
          type="number"
          max={1000}
          className="w-20 p-2 md:p-3 ml-3 md:mx-4 font-Basic text-center bg-white border-[1px] border-gray-200 md:border-0 rounded-lg shadow-md focus:outline-black"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col items-start md:flex-row flex-wrap md:items-center">
          <p className="font-Basic text-3xl font-bold tracking-tighter md:tracking-tight mr-3">
            $
            {Number(inputValue) === 0
              ? "0"
              : Number(inputValue).toLocaleString()}
          </p>
          <p className="text-tertiary min-w-[33%] py-3 md:py-0 mr-2">
            bets would make you
          </p>
          <p className="font-Basic text-3xl font-bold tracking-tighter md:tracking-tight">
            ${returns}
          </p>
        </div>

        {/* Little corn animation */}
        <div className="flex flex-row justify-start items-center pt-8 md:pt-10">
          <p className="font-Basic text-5xl font-bold tracking-tighter md:tracking-tight">
            {emojiText}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Projections };
