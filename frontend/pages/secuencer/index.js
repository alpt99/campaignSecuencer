// "use client";
import React, { useState, useCallback } from "react";
import Layout from "../../components/layout";
import CardAction from "../../components/cardAction";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  NodeToolbar,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const CampaignSecuencer = () => {
  const [leftItems, setLeftItems] = useState([]);
  const [centerItems, setCenterItems] = useState([]);
  const [rightConfig, setRightConfig] = useState([]);

  const handleAddToCenter = (item) => {
    setCenterItems([...centerItems, item]);
  };

  const handleRemoveFromCenter = (index) => {
    const updatedCenterItems = [...centerItems];
    updatedCenterItems.splice(index, 1);
    setCenterItems(updatedCenterItems);
  };
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Layout>
      <div className="flex flex-row w-screen h-[100%]">
        <div className="flex flex-col divide-y-4 mx-2">
          <div className="font-semibold">Triggers</div>
          <CardAction
            onClick={() => {
              console.log("1");
            }}
          />
          <div className="font-semibold">Actions</div>
          <CardAction
            onClick={() => {
              console.log("2");
            }}
          />
          <div className="font-semibold">Exit Criteria Events</div>
          <CardAction
            onClick={() => {
              console.log("3");
            }}
          />
        </div>
        <div className=" bg-gray-100 border-2 w-2/3 mx-2">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <MiniMap />
            <Panel />
            <NodeToolbar />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <div className="border-2 border-secondary flex-grow mx-2">
          <div className="text-center font-semibold">Configuration</div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignSecuencer;
