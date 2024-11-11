import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const [currentImage, setCurrentImage] = useState(1);
  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData, imageURL, currentImage]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden ">
        {bannerData.map((data, index) => {
          {/* console.log("data", data); */}
          return (
            <div key={data.id + "bannerHome"+ index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                <img
                  src={imageURL + data.backdrop_path}
                  className="object-cover w-full h-full"
                  alt="data.title"
                />
              </div>
              {/**button next and previous image */}
              <div className="absolute top-0 items-center justify-between hidden w-full h-full p-6 group-hover:lg:flex">
                <button
                  onClick={handlePrevious}
                  className="z-10 p-1 text-2xl text-black bg-white rounded-full"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="z-10 p-1 text-2xl text-black bg-white rounded-full"
                >
                  <FaAngleRight />
                </button>
              </div>
              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto">
                <div className="absolute bottom-0 w-full max-w-md px-3 ">
                  <h2 className="text-2xl font-bold text-white lg:text-4xl drop-shadow-2xl">
                    {data?.title || data?.name}
                  </h2>
                  <p className="my-2 text-ellipsis line-clamp-3">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View: {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <button className="px-4 py-2 mt-4 font-bold text-black transition-all bg-white rounded shadow-md hover:bg-gradient-to-t from-red-100 to-orange-500 hover:scale-105">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;