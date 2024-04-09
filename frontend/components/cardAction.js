import * as React from "react";

export default function CardAction({ onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button onClick={handleClick}>
      <div className="card card-side bg-base-100 shadow-xl w-56 h-16">
        <div className="bg-blue-500 w-[2%]"></div>
        <div className="ml-4">
          <h2 className=" text-sm font-bold">New movie is released!</h2>
          <p className="text-xs">Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            {/* <button className="btn btn-primary">Watch</button> */}
          </div>
        </div>
      </div>
    </button>
  );
}
