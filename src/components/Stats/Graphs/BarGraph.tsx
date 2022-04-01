import { BarDatum, BarTooltipProps, ResponsiveBar } from "@nivo/bar";
import React, { FC, PropsWithChildren } from "react";
import { IntervalAndProfit } from "../../../types";

interface Props {
  data: IntervalAndProfit[];
}

const BarGraph: FC<Props> = ({ data }) => (
  <ResponsiveBar
    // @ts-ignore
    data={data}
    keys={["profit"]}
    indexBy="interval"
    margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
    padding={0.1}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={"#302c2c"}
    borderRadius={25}
    // Axis & grids
    enableGridY={false}
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={null}
    // Labels
    enableLabel={false}
    legends={[]}
    tooltip={CustomTooltip}
    // Animation
    animate={false}
  />
);

const CustomTooltip = ({
  value,
  indexValue,
}: PropsWithChildren<BarTooltipProps<BarDatum>>) => (
  <div className="backdrop-brightness-175 backdrop-blur-lg px-2 py-1.5 rounded-sm text-gray-200 text-xs">
    {indexValue} (
    {`${value && value > 0 ? `+${value?.toFixed(2)}` : value?.toFixed(2)}u`})
  </div>
);

export default BarGraph;
