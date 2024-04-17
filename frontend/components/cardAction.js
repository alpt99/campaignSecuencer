import * as React from "react";

export default function CardAction({ onClick, name }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  // bg-blue-500
  return (
    <button onClick={handleClick}>
      <div className="card card-side bg-base-100 shadow-xl w-56 h-16">
        <div className="bg-accent w-[2%] rounded-lg"></div>
        <div className="ml-4">
          <h2 className=" text-sm font-bold">{name}</h2>
          <p className="text-xs">Configura apretando el nodo</p>
          <div className="card-actions justify-end">
            {/* <button className="btn btn-primary">Watch</button> */}
          </div>
        </div>
      </div>
    </button>
  );
}
