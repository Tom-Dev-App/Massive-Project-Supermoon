
import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";


const CardBlog = ({ blog }) => {
  return (
    <>
      <div className="font-productSans p-4">
        <div className="w-full h-full bg-neutral-card rounded-lg drop-shadow-xl">
          <img
            src={`${SERVER_URL}${blog.img_path}`}
            alt={blog?.title}
            className="rounded-lg"
          />
          <div className="p-5">
            <h5 className="mb-2 lg:text-xl text-base font-bold tracking-tight text-gray-900">
              {blog?.title}
            </h5>
            <div className="flex justify-end bottom-0">
              <Link
                to={`/blog/detil/${blog?.slug}`}
                className="inline-flex items-center px-4 py-2 text-base text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg"
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

export default CardBlog;
