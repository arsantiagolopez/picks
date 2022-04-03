import { Tab } from "@headlessui/react";
import React, { FC, useState } from "react";
import useSWR from "swr";
import { Graphs } from "./Graphs";
import { Overview } from "./Tabs/Overview";
import { Projections } from "./Tabs/Projections";

interface Props {}

const Stats: FC<Props> = () => {
  const [weekProfit, setWeekProfit] = useState<number>(0);
  const [monthProfit, setMonthProfit] = useState<number>(0);
  const [yearProfit, setYearProfit] = useState<number>(0);
  const [allProfit, setAllProfit] = useState<number>(0);

  const { data: stats } = useSWR("/api/bets/stats");

  const graphsProps = {
    weekProfit,
    setWeekProfit,
    monthProfit,
    setMonthProfit,
    yearProfit,
    setYearProfit,
    allProfit,
    setAllProfit,
  };
  const overviewProps = { stats };
  const projectionsProps = {
    weekProfit,
    monthProfit,
    yearProfit,
    allProfit,
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] mb-12 md:mb-0">
      {/* Full screen */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left side*/}
        <div className="w-full h-full pt-16 min-h-[70vh] md:min-h-[80vh] md:py-[3vw] min-w-[50%]">
          <Graphs {...graphsProps} />
        </div>

        {/* Right side*/}
        <div className="flex flex-col justify-center items-center w-full my-[3vw] rounded-lg bg-gray-50 dark:bg-secondary dark:shadow-xl p-5 md:p-8">
          <Tab.Group>
            <Tab.List className="flex flex-row justify-start w-full tracking-tight">
              <Tab
                className={({ selected }) =>
                  `${
                    selected
                      ? "text-primary font-bold dark:text-white"
                      : "text-tertiary dark:text-fourth"
                  }`
                }
              >
                Overview
              </Tab>
              <Tab
                className={({ selected }) =>
                  `ml-6 ${
                    selected
                      ? "text-primary font-bold dark:text-white"
                      : "text-tertiary dark:text-fourth"
                  }`
                }
              >
                Projections
              </Tab>
            </Tab.List>

            <Tab.Panels className="flex flex-col h-full w-full mt-6 rounded-lg bg-gradient-to-b from-gray-100 to-gray-50 dark:bg-gradient-to-b dark:from-tertiary dark:to-secondary p-4 md:p-8 overflow-hidden">
              <Tab.Panel>
                <Overview {...overviewProps} />
              </Tab.Panel>
              <Tab.Panel>
                <Projections {...projectionsProps} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export { Stats };
