import React from "react";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CardWisata = (props) => {
  const { tour } = props;
  return (
    <>
      <div className="p-4 font-productSans">
        <div className="w-full bg-neutral-card rounded-lg drop-shadow-xl">
          <img
            className="rounded-t-lg"
            src={tour.image_card}
            alt={tour.title}
          />
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-neutral-100">
              {tour.title}
            </h5>
            <div className="flex flex-row gap-2">
              <a className="text-primary-pressed">
                {tour.category[0].category1}
              </a>
              <a className="text-primary-pressed">
                {" "}
                {tour.category[1].category2}
              </a>
              <a className="text-primary-pressed">
                {tour.category[2].category3}
              </a>
            </div>
            <div className="flex flex-row justify-between p-3">
              <div className="flex flex-row">
                <BsStarFill className="w-10 h-10" fill="#EE9C22" />
                <div className="ml-4">
                  <p className="text-sm font-bold">{tour.rating}</p>
                  <p className="text-sm">{tour.review}</p>
                </div>
              </div>
              <Link
                to="/wisata/detailWisata"
                className="inline-flex items-center px-4 py-2 text-[16px]  text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg"
              >
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardWisata;
