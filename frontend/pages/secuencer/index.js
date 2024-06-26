// "use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
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
import CampaignConfig from "../../components/campaignConfig";
import CampaignActionButtons from "../../components/campaignActionButtons";
import {
  campaignSchema,
  emailConfigSchema,
  timeIntervalSchema,
} from "../../utils/yupSchemas";

const emailContentOptions = [
  { value: "Normal Products Offers", label: "Normal Products Offers" },
  { value: "Discounted Products Offers", label: "Discounted Products Offers" },
];

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
let position = 0;

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
  const [timeInterval, setTimeInterval] = useState(1);
  const [nodeData, setNodeData] = useState({});
  const yPos = useRef(0);

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
      setTimeInterval(node.data.time_interval);
    },
    [setConfig, selectedNodeId]
  );

  const addEmailNode = () => {
    yPos.current += 100;
    const emailId = `${nodes.length + 1}`;
    const newActionNode = {
      id: emailId,
      position: { x: 100, y: yPos.current },
      data: {
        label: "EmailNode",
        node_type: "EmailNode",
        description: "Envia un mail",
        email_subject: "Subject",
        email_content: "",
      },
      type: "actionNode",
    };
    setNodes((n) => n.concat(newActionNode));
    setCounter(counter + 1);
    setConfig("");
  };

  const addTimeDelayNode = () => {
    yPos.current += 100;
    const emailId = `${nodes.length + 1}`;
    const newActionNode = {
      id: emailId,
      position: { x: 100, y: yPos.current },
      data: {
        label: "TimeDelayNode",
        node_type: "TimeDelayNode",
        description: "Espera un tiempo",
        time_interval: 1,
      },
      type: "actionNode",
    };
    setNodes((n) => n.concat(newActionNode));
    setCounter(counter + 1);
    setConfig("");
  };

  const createCampaign = async () => {
    if (currentCampaign !== null) {
      return;
    }
    const nodes_info = nodes.map((node) => {
      let info = {
        node_id: node.id,
        node_type: node.data.node_type,
        node_description: node.data.description,
      };

      if (node.data.label === "TimeDelayNode") {
        info = {
          ...info,
          time_interval: parseInt(node.data.time_interval, 10),
        };
      } else if (node.data.label === "EmailNode") {
        info = {
          ...info,
          email_subject: node.data.email_subject,
          email_content: node.data.email_content,
        };
      }

      return info;
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
    try {
      const validation = await campaignSchema.validate(campaign);
      const response = await axios.post(
        "http://localhost:3000/campaigns",
        campaign,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Campaign created successfully:", response.data);
      setCurrentCampaign(response.data.id);
      alert("Campaign created successfully");
    } catch (error) {
      console.error("Error creating campaign:", error);
      if (error.name === "ValidationError") {
        alert("Campaign Data is required.");
      }
      alert("Error creating campaign");
    }
  };

  const runCampaign = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/campaigns/${currentCampaign}/run_campaign`
      );
      console.log("Campaign runned successfully:", response.data);
      alert("Campaign runned successfully");
      // setCurrentCampaign(response.data.);
    } catch (error) {
      console.error("Error running campaign:", error);
      alert("Error running campaign");
    }
  };

  const editNode = () => {
    if (config === "EmailNode") {
      emailConfigSchema
        .validate({ emailContent, emailSubject })
        .then((valid) => {
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
          alert("Saved Node Configuration");
        })
        .catch((error) => {
          console.error("Error validating email config:", error);
          alert("Email data is required.");
        });
    } else if (config === "TimeDelayNode") {
      timeIntervalSchema
        .validate({ timeInterval })
        .then((valid) => {
          const newNodes = nodes.map((node) => {
            if (node.id === selectedNodeId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  time_interval: timeInterval,
                },
              };
            }
            return node;
          });
          setNodes(newNodes);
          alert("Saved Node Configuration");
        })
        .catch((error) => {
          console.error("Error validating time interval:", error);
          alert("Time interval is required.");
        });
    }
  };

  return (
    <Layout>
      <div className="flex flex-row w-screen h-[100%]">
        <CampaignActionButtons
          addEmailNode={addEmailNode}
          addTimeDelayNode={addTimeDelayNode}
        />

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
            <div className="h-[40%] flex flex-col">
              <div>Node Configuration {selectedNodeId}</div>
              {nodes.length === 0 || config === "" ? (
                <div>Start by adding a node</div>
              ) : (
                <div className="h-full">
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
                        <select
                          value={emailContent}
                          onChange={(e) => {
                            setEmailContent(e.target.value);
                          }}
                          className="select select-bordered m-2"
                        >
                          <option value="">Select Email Content</option>
                          <option value="Normal Products Offers">
                            Normal Products Offers
                          </option>
                          <option value="Discounted Products Offers">
                            Discounted Products Offers
                          </option>
                        </select>
                        {/* Error message if needed */}
                        {emailContent === "" && (
                          <div className="error-message">
                            Email content is required.
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col h-full">
                        <div>Current Time Interval Node Configuration</div>
                        <label className="input input-bordered flex items-center gap-2 m-2">
                          <input
                            type="number"
                            className="grow"
                            placeholder="Time Interval"
                            value={timeInterval}
                            onChange={(e) => {
                              setTimeInterval(e.target.value);
                            }}
                          />
                        </label>
                        {/* Error message if needed */}
                        {nodeData.time_interval === "" && (
                          <div className="error-message">
                            Time interval is required.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button className="btn btn-primary m-2" onClick={editNode}>
                    Save Node Config
                  </button>
                </div>
              )}
            </div>
            <div className="divider m-1"></div>
            <div>
              <CampaignConfig
                currentCampaign={currentCampaign}
                campaignTitle={campaignTitle}
                campaignDescription={campaignDescription}
                setCampaignTitle={setCampaignTitle}
                setCampaignDescription={setCampaignDescription}
                createCampaign={createCampaign}
                runCampaign={runCampaign}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignSecuencer;
