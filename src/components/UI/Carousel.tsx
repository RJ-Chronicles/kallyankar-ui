import { MoveLeft, MoveRight } from "lucide-react";
import React, { useState, useEffect } from "react";

type CarouselProps = {
  images: string[];
  interval: number;
};
const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, interval);
    return () => clearInterval(intervalId);
  }, [currentIndex, interval]);

  return (
    <div className="relative h-[80vh] flex justify-center items-center">
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } absolute inset-0 transition-opacity duration-1000 px-[10%]`}
          >
            <img
              className="w-full h-full object-cover rounded-sm shadow-md"
              src={image}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="mx-[10%] absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white shadow-md"
        >
          <MoveLeft />
        </button>
        <button
          onClick={nextSlide}
          className="mx-[10%] absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white shadow-md"
        >
          <MoveRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
