import React, { FC } from "react";

interface Props {}

const Footer: FC<Props> = () => {
  return (
    <div className="flex flex-row justify-center items-center w-screen bg-primary text-gray-100 text-sm h-20 md:h-32 tracking-widest font-Times italic">
      <a
        href={process.env.NEXT_PUBLIC_PORTFOLIO}
        rel="noreferrer"
        target="_blank"
        className="cursor-pointer"
      >
        Designed with ❤️ by <span className="ml-1 underline">Alex.</span>
      </a>
    </div>
  );
};

export { Footer };
