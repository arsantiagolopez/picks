import React, { FC } from "react";

interface Props {}

const PastTournaments: FC<Props> = () => {
  return (
    <div className="flex flex-col items-center w-full pt-16 md:pt-20 pb-10 md:pb-12">
      <h1 className="font-Basic text-primary text-4xl md:text-6xl tracking-tighter">
        Past Tournaments
      </h1>
    </div>
  );
};

export { PastTournaments };
