import React from 'react';
import { Button } from '@chakra-ui/react';
import { downloadJson } from '../../utils/downloadJson'; // Adjust the import path as needed
import { workflowData } from './Workflow.constants'; // Your JSON data

const ExportButton = () => {
  const handleDownload = () => {
    downloadJson(workflowData, 'workflow.json');
  };

  return (
    <Button onClick={handleDownload} colorScheme="blue">
      Download JSON
    </Button>
  );
};

export default ExportButton;
