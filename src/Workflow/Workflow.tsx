import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import {
  generateFunctionWorkflow,
  initialEdges,
  initialNodes,
  workflowData,
  workflowFunctions,
} from "./Workflow.constants";
import PaymentInit from "./PaymentInit";
import PaymentCountry from "./PaymentCountry";
import PaymentProvider from "./PaymentProvider";
import PaymentProviderSelect from "./PaymentProviderSelect";
import CustomEdge from "./CustomEdge";

const nodeTypes = {
  paymentInit: PaymentInit,
  paymentCountry: PaymentCountry,
  paymentProvider: PaymentProvider,
  paymentProviderSelect: PaymentProviderSelect,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update workflowData whenever the nodes or edges change
  const updateWorkflowData = (newNodes: Node[], newEdges: Edge[]) => {
    workflowData.nodes = newNodes;
    workflowData.edges = newEdges;
    console.log("Updated Workflow Data:", workflowData);
  };

  useEffect(() => {
    updateWorkflowData(nodes, edges);
    console.log(
      "Json",
      JSON.stringify(generateFunctionWorkflow(nodes, edges), null, 2)
    );
  }, [edges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length} + 1`,
        type: "customEdge",
        sourceHandle: sourceNode?.data?.name,
        targetHandle: targetNode?.data?.name,
      };

      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges, nodes]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      updateWorkflowData(nodes, edges);
    },
    [onNodesChange, nodes, edges]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes);
      updateWorkflowData(nodes, edges);
    },
    [onEdgesChange, nodes, edges]
  );

  return (
    <Box height={"500px"} width="700px" border="1px solid black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
