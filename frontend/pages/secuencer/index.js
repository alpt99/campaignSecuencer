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
import axios from "axios";

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
  const [counter, setCounter] = useState(0);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeData, setNodeData] = useState({});

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeSelection = useCallback(
    (event, node) => {
      console.log("Node selected:", node);
      // setConfig(`Se esta modificando todo del nodo ${node.data.label}`);
      setConfig((prevConfig) => `${node.data.node_type}`);
      setSelectedNodeId(node.id);
      setNodeData(node.data);
      setEmailContent(node.data.email_content);
      setEmailSubject(node.data.email_subject);
    },
    [setConfig, selectedNodeId]
  );

  const addEmailNode = () => {
    const emailId = `${nodes.length + 1}`;
    const newActionNode = {
      id: emailId,
      position: { x: 100, y: 200 },
      data: {
        label: "EmailNode",
        node_type: "EmailNode",
        description: "Envia un mail",
        email_subject: "Subject",
        email_content: "Content",
      },
      type: "actionNode",
    };
    setNodes((n) => n.concat(newActionNode));
    setCounter(counter + 1);
  };

  const addTimeIntervalNode = () => {
    const emailId = `${nodes.length + 1}`;
    const newActionNode = {
      id: emailId,
      position: { x: 100, y: 200 },
      data: { label: "TimeIntervalNode" },
      type: "actionNode",
    };
    setNodes((n) => n.concat(newActionNode));
    setCounter(counter + 1);
  };

  const createCampaign = async () => {
    if (currentCampaign !== null) {
      return;
    }
    const nodes_info = nodes.map((node) => {
      console.log(node);
      return {
        node_id: node.id,
        node_type: node.data.node_type,
        node_description: node.data.description,
        email_subject: node.data.email_subject,
        email_content: node.data.email_content,
      };
    });
    const edges_info = edges.map((edge) => {
      return {
        srcNode: edge.source,
        destNode: edge.target,
      };
    });
    const campaign = {
      title: campaignTitle,
      description: campaignDescription,
      nodes_attributes: nodes_info,
      edges_attributes: edges_info,
    };
    console.log(campaign);
    try {
      const response = await axios.post(
        "http://localhost:3000/campaigns",
        campaign,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Campaign created successfully:", response.data);
      setCurrentCampaign(response.data.id);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const runCampaign = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/campaigns/${currentCampaign}/run_campaign`
      );
      console.log("Campaign created successfully:", response.data);
      // setCurrentCampaign(response.data.);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const editNode = () => {
    console.log("Node data:", nodeData);
    const newNodes = nodes.map((node) => {
      if (node.id === selectedNodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            email_content: emailContent,
            email_subject: emailSubject,
          },
        };
      }
      return node;
    });
    setNodes(newNodes);
  };

  return (
    <Layout>
      <div className="flex flex-row w-screen h-[100%]">
        <div className="flex flex-col divide-y-4 mx-2">
          <div className="font-semibold">Email</div>
          <CardAction onClick={addEmailNode} name={"Email"} />
          <div className="font-semibold">Time Interval</div>
          <CardAction onClick={addTimeIntervalNode} name={"Time Interval"} />
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
            <div className="h-[50%] flex flex-col">
              <div>Node Config {selectedNodeId}</div>
              <div className="flex-grow">
                {config === "EmailNode" ? (
                  <div className="flex flex-col h-full">
                    <div>Current Email Config</div>
                    <label className="input input-bordered flex items-center gap-2 m-2">
                      <input
                        type="text"
                        className="grow"
                        placeholder="Email Subject"
                        value={emailSubject}
                        onChange={(e) => {
                          setEmailSubject(e.target.value);
                        }}
                      />
                    </label>
                    <textarea
                      className="textarea textarea-primary m-2 h-[100%]"
                      placeholder="Email Content"
                      value={emailContent}
                      onChange={(e) => {
                        setEmailContent(e.target.value);
                      }}
                    ></textarea>
                  </div>
                ) : (
                  <div>Configura apretando el nodo</div>
                )}
              </div>
              <button className="bg-primary m-2 p-2" onClick={editNode}>
                Save Node Config
              </button>
            </div>
            <div className="divider m-1"></div>
            <div>
              <div>
                <div>Current Campaign {currentCampaign}</div>
                <div className="flex flex-col">
                  <label className="input input-bordered flex items-center gap-2 m-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Campaign Title"
                      value={campaignTitle}
                      onChange={(e) => setCampaignTitle(e.target.value)}
                    />
                  </label>
                  <textarea
                    className="textarea textarea-primary m-2"
                    placeholder="Description"
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                  ></textarea>
                </div>
                {currentCampaign !== null ? (
                  <div>
                    <div>Current Campaign Id: {currentCampaign}</div>
                    <button
                      className="bg-primary m-2 p-2"
                      onClick={runCampaign}
                    >
                      Run Current Campaign
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-primary m-2 p-2"
                    onClick={createCampaign}
                  >
                    Create Campaign
                  </button>
                )}
              </div>
              <div>
                <div>Other Campaigns</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignSecuencer;
