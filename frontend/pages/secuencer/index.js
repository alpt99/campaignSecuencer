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
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Start" } },
];
const initialEdges = [
  // {
  //   id: "e1-2",
  //   source: "1",
  //   target: "2",
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
];
const CampaignSecuencer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addTriggerNode = () => {
    const emailId = `trigger-${nodes.length + 1}`;
    const emailNode = {
      id: emailId,
      position: { x: 100, y: 200 },
      data: { label: "Trigger" },
    };
    setNodes((n) => n.concat(emailNode));
  };

  const addEmailNode = () => {
    const emailId = `email-${nodes.length + 1}`;
    const emailNode = {
      id: emailId,
      position: { x: 100, y: 200 },
      data: { label: "Email" },
    };
    setNodes((n) => n.concat(emailNode));
  };

  const addEndNode = () => {
    const emailId = `end-${nodes.length + 1}`;
    const emailNode = {
      id: emailId,
      position: { x: 100, y: 200 },
      data: { label: "End" },
    };
    setNodes((n) => n.concat(emailNode));
  };

  return (
    <Layout>
      <div className="flex flex-row w-screen h-[100%]">
        <div className="flex flex-col divide-y-4 mx-2">
          <div className="font-semibold">Triggers</div>
          <CardAction onClick={addTriggerNode} />
          <div className="font-semibold">Actions</div>
          <CardAction onClick={addEmailNode} />
          <div className="font-semibold">Exit Criteria Events</div>
          <CardAction onClick={addEndNode} />
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
