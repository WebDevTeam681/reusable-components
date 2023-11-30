import { useEffect } from "react";
import { useState } from "react";
import img1 from "../assets/carousalImages/img1.jpg";
import img2 from "../assets/carousalImages/img2.jpg";
import img3 from "../assets/carousalImages/img3.jpg";
import img4 from "../assets/carousalImages/img4.jpg";
import img5 from "../assets/carousalImages/img5.jpg";

const Carousal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliders = [
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
    {
      img: img4,
    },
    {
      img: img5,
    },
  ];

  useEffect(() => {
    const slider = setTimeout(() => {
      const nextSlide = (currentSlide + 1) % sliders.length;
      setCurrentSlide(nextSlide);
    }, 3000);

    return () => {
      clearTimeout(slider);
    };
  }, [currentSlide, sliders.length]);

  const backward = () => {
    setCurrentSlide(
      prevSlide => (prevSlide - 1 + sliders.length) % sliders.length,
    );
  };

  const forward = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % sliders.length);
  };

  return (
    <div className={`flex items-center justify-center h-screen`}>
      <div className="relative overflow-hidden w-3/5 h-[80vh]">
        {sliders.map((s, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 flex items-center justify-center h-full w-full transform transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(${
                currentSlide === i ? "0%" : currentSlide < i ? "-100%" : "100%"
              })`,
              order: currentSlide === i ? 1 : 0,
            }}
          >
            <img src={s.img} alt="Carousal Image" className={`w-full h-full`} />
          </div>
        ))}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          {sliders.map((slide, i) => (
            <button
              key={i}
              className={`w-[10px] h-[10px] rounded-full ${
                currentSlide === i ? "bg-green-600" : "bg-white"
              }  mx-1`}
              onClick={() => setCurrentSlide(i)}
            ></button>
          ))}
        </div>
        <div className="absolute bottom-3 right-2">
          <button
            className={` rounded p-2 text-white mx-1 bg-green-600 disabled:bg-gray-300 disabled:text-gray-600`}
            onClick={() => backward()}
          >
            Backward
          </button>
          <button
            className={` rounded p-2 mx-1 bg-white text-green-600 disabled:bg-gray-300 disabled:text-gray-600`}
            onClick={() => forward()}
          >
            Forward
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
