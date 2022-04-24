import React, { FC } from "react";

interface Props {}

const TwitterButton: FC<Props> = () => (
  <button className="mb-8 md:mb-10 bg-primary text-white dark:bg-tertiary dark:shadow-neutral-900 dark:hover:bg-black dark:shadow-xl rounded-full px-7 py-2 text-sm font-bold hover:shadow-lg hover:animate-pulse shadow-black">
    <a
      href={process.env.NEXT_PUBLIC_TWITTER_LINK}
      className="flex flex-row justify-center items-center "
      rel="noreferrer"
      target="_blank"
    >
      Don&apos;t miss a live bet
      <img
        src="/twitter.gif"
        className="h-6 ml-1 -mr-4 mt-0.5 pr-2 brightness-0 invert-[1]"
      />
    </a>
  </button>
);

export { TwitterButton };
