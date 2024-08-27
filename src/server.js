// server.js (Backend)
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

// Middleware to parse JSON body
app.use(express.json());

// Path to the JSON file
const jsonFilePath = path.join(__dirname, "workflowData.json");

// Endpoint to get workflow data
app.get("/api/workflow", (req, res) => {
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).send("Error reading JSON file");
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to update workflow data
app.post("/api/workflow", (req, res) => {
  const newData = req.body;

  fs.writeFile(jsonFilePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return res.status(500).send("Error writing JSON file");
    }
    res.send("Workflow data updated successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
