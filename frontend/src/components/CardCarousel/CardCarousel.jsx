import React from "react";

const CardCarousel = (props) => {
  const { carouselImg } = props;
  return (
    <>
      <li>
        <img src={carouselImg.img} alt={carouselImg.title} />
      </li>
    </>
  );
};

export default CardCarousel;
