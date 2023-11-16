import React from "react";

const Button = (props) => {
  return (
    <>
      <button className="inline-flex items-center px-4 py-2 text-[16px] text-center bg-primary-main rounded-lg text-neutral-10">
        {props.children}
      </button>
    </>
  );
};

export default Button;
