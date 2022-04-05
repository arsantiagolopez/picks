import React, { FC } from "react";

interface Props {}

const Testimonials: FC<Props> = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full pt-16 md:pt-20 pb-10 md:pb-12">
      <h1 className="font-Basic text-primary dark:text-white text-4xl md:text-6xl tracking-tighter">
        What people are saying
      </h1>

      {/* Content */}
      <div className="flex flex-row justify-center items-center md:items-start py-14 w-full">
        <div className="masonry-1-col md:masonry-2-col lg:masonry-3-col"></div>
      </div>
    </div>
  );
};

export { Testimonials };
