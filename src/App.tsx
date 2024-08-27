import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Workflow } from "./Workflow/Workflow";
import ExportButton from "./Workflow/ExportButton";
function App() {
  const [count, setCount] = useState(0);

  return (
    <ChakraProvider>
      <Workflow />
      <ExportButton />
    </ChakraProvider>
  );
}

export default App;
