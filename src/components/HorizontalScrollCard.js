import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const HorizontalScrollCard = ({ data = [], heading,trending,media_type }) => {
  const containerRef = useRef();

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -300, // Adjust this value to control the scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 300, // Adjust this value to control the scroll distance
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="container px-3 mx-auto my-10">
        <h2 className="mb-3 text-xl font-bold text-white capitalize lg:text-2xl">
          {heading}
        </h2>
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-5 overflow-x-scroll scroll-smooth hide-scrollbar"
          >
            {data.map((item, index) => (
              <Card
                key={item.id + "heading" + index}
                data={item}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            ))}
          </div>
          <div className="absolute inset-0 items-center justify-between hidden pointer-events-none lg:flex ">
            <button
              onClick={scrollLeft}
              className="p-2 text-black bg-white rounded-full shadow-lg pointer-events-auto hover:bg-gray-200"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 text-black bg-white rounded-full shadow-lg pointer-events-auto hover:bg-gray-200"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
