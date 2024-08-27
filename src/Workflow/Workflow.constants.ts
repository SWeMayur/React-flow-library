import { Edge, Node } from "reactflow";

// Initial edges and nodes for the workflow
export const initialEdges: Edge[] = [
  {
    id: "1",
    source: "1",
    target: "2",
    type: "customEdge",
    animated: true,
    sourceHandle: "Payment Init", // Example names
    targetHandle: "US Country",
  },
  {
    id: "2",
    source: "2",
    target: "4",
    type: "customEdge",
    animated: true,
    sourceHandle: "US Country",
    targetHandle: "Google Pay",
  },
  // Add more edges as needed
];

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { amount: 10, name: "Payement Init" },
    type: "paymentInit",
  },
  {
    id: "2",
    data: {
      currency: "$",
      country: "United States",
      countryCode: "US",
      name: "US Country",
    },
    position: { x: 300, y: 20 },
    type: "paymentCountry",
  },
  {
    id: "3",
    data: {
      currency: "£",
      country: "England",
      countryCode: "GB",
      name: "England",
    },
    position: { x: 300, y: 200 },
    type: "paymentCountry",
  },
  {
    id: "4",
    data: { name: "Google Pay", code: "Gp" },
    position: { x: 550, y: -50 },
    type: "paymentProvider",
  },
  {
    id: "5",
    data: { name: "Stripe", code: "St" },
    position: { x: 550, y: 125 },
    type: "paymentProvider",
  },
  {
    id: "6",
    data: { name: "Apple Pay", code: "Ap" },
    position: { x: 550, y: 325 },
    type: "paymentProvider",
  },
  {
    id: "7",
    data: {},
    position: { x: 275, y: -100 },
    type: "paymentProviderSelect",
  },
];

export function generateFunctionWorkflow(nodes: Node[], edges: Edge[]) {
  const functions = nodes.map((node) => {
    // Get the edges where the current node is a target to form parameters
    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const params = incomingEdges.map((edge) => edge.source);

    return {
      name: node.data.name, // Using the node name as the function name
      id: node.id,
      params: params.length ? params : undefined, // Only include params if they exist
    };
  });

  return { functions };
}

export const workflowFunctions = generateFunctionWorkflow(
  initialNodes,
  initialEdges
);

console.log("Json", JSON.stringify(workflowFunctions, null, 2));

// A variable to store the workflow data
export let workflowData = {
  nodes: initialNodes,
  edges: initialEdges,
};
