// "use client";
import React, { useState, useCallback, useEffect } from "react";
import Layout from "../../components/layout";
import CardAction from "../../components/cardAction";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import actionNode from "../../components/actionNode";

const nodeTypes = {
  actionNode: actionNode,
};
const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};
const initialNodes = [];
const initialEdges = [];
const CampaignSecuencer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [config, setConfig] = useState("");
  const [addition, setAddition] = useState({});

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeSelection = useCallback(
    (event, node) => {
      console.log("Node selected:", node);
      // setConfig(`Se esta modificando todo del nodo ${node.data.label}`);
      setConfig(
        (prevConfig) => `Se esta modificando todo del nodo ${node.data.label}`
      );
    },
    [setConfig]
  );

  const addTriggerNode = () => {
    const emailId = `trigger-${nodes.length + 1}`;
    const emailNode = {
      id: emailId,
      position: { x: 100, y: 200 },
      data: {
        label: "Trigger",
        handleEdit: () => setConfig("Editando nodo de salidad"),
      },
      type: "actionNode",
    };
    setNodes((n) => n.concat(emailNode));
  };

  const addActionNode = () => {
    console.log("Adding action node");
    const emailId = `action-${nodes.length + 1}`;
    const newActionNode = {
      id: emailId,
      position: { x: 100, y: 200 },
      data: { label: "action" },
      type: "actionNode",
    };
    // setAddition(newActionNode);
    // setNodes(...nodes, emailNode);
    // useCallback(() => {
    //   const newActionNode = {
    //     id: emailId,
    //     position: { x: 100, y: 200 },
    //     data: { label: "action" },
    //     type: "actionNode",
    //   };
    //   // setNodes((nodes) => [...nodes, emailNode]);
    //   setNodes((nds) => nds.concat(newActionNode));
    // }, []);
    setNodes((n) => n.concat(newActionNode));
  };

  const addEndNode = () => {
    const emailId = `end-${nodes.length + 1}`;
    const emailNode = {
      id: emailId,
      position: { x: 100, y: 200 },
      data: { label: "End" },
      type: "actionNode",
      handleEdit: () => setConfig("Editando nodo de salidad"),
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
          <CardAction onClick={addActionNode} />
          <CardAction onClick={addActionNode} />
          <div className="font-semibold">Exit Criteria Events</div>
          <CardAction onClick={addEndNode} />
        </div>
        <div className=" bg-gray-100 border-2 w-1/2 mx-2">
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // onSelectionChange={useOnSelectionChange}
            onNodeClick={handleNodeSelection}
            defaultEdgeOptions={defaultEdgeOptions}
          >
            <Controls />
            <MiniMap />
            <Panel />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <div className="border-2 border-base-900 flex-grow mx-2">
          <div className="text-center font-semibold h-full">
            <div className="h-[60%]">
              <div>Node Config</div>
              <div>{config}</div>
            </div>
            <button>Run Current Campaign</button>
            <button>Save Current Campaign</button>
            <div>
              <div>Other Campaigns</div>
              <div>Campaign 1</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignSecuencer;
