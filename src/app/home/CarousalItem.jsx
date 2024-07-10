"use client"
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarousalItem = () => {

    const imageProp = ["pizza", "burger", "milkshake"];
  return (
    <Carousel
     autoPlay
      navButtonsAlwaysVisible
      infiniteLoop
      showStatus={false}
      emulateTouch
      showThumbs={false}
    >
      {imageProp.map((image, index) => {
        return (
          <div
            key={index}
            style={{ maxHeight: "36rem" }}
            className="object-center brightness-50"
          >
            <img
              src={`https://source.unsplash.com/random/900x600/?${image}`}
              alt="pizza"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarousalItem;
