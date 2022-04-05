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
        {/* Testimonials */}
        <div className="masonry-1-col md:masonry-2-col lg:masonry-3-col">
          {/* Card */}
          <div className="break-inside border p-3 mb-3 bg-green-600 text-white">
            <h2 className="text-2xl pb-2">Test</h2>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, animi praesentium est ab a sint voluptatibus
              perspiciatis suscipit ex rerum.
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa ab
              exercitationem minus perspiciatis officiis quasi fuga aperiam
              repellendus modi natus.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Testimonials };
