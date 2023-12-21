import React from "react";

const ImgGalleryTour = (props) => {
  const { tour } = props;
  return (
    <>
      <img src={tour.image_detail[0].img1} alt="" />
    </>
  );
};

export default ImgGalleryTour;
