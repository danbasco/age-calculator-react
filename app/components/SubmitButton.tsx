import React from "react";
import arrowIcon from "/assets/images/icon-arrow.svg";

interface Props {
  onCalculate: () => void;
}

const SubmitButton: React.FC<Props> = ({ onCalculate }) => {
  return (
    <div className="relative flex items-center my-16 sm:my-8">
      <hr className="w-full border-t border-stone-300" />
      <button
        onClick={onCalculate}
        className="absolute right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 bg-violet-600 p-4 sm:p-5 rounded-full hover:bg-black focus:outline-none"
      >
        <img
          src={arrowIcon}
          alt="Calculate age"
          className="w-6 h-6 sm:w-auto sm:h-auto"
        />
      </button>
    </div>
  );
};

export default SubmitButton;
