import React, { memo } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>
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
      </div>
      <NodeToolbar position={Position.Right}>
        {/* <div className="bg-base-100 w-[50vh] h-[50vh] border-2 border-black-400">
          <div>Node Toolbar</div>
        </div> */}
        <div className="flex flex-col justify-start">
          <button
            onClick={data.handleEdit}
            className="m-2 px-2 bg-secondary rounded-md"
          >
            Delete
          </button>
        </div>
      </NodeToolbar>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
