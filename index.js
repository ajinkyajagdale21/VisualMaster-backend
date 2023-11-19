const express = require('express');
const csvtojson = require('csvtojson');
const fs = require('fs');

const csvFilePath = './dataFiles/data.csv';
const app = express();
const port = 3000; 


app.get('/api/data',async (req, res) => {
    try {
        const csvData = await fs.promises.readFile(csvFilePath, 'utf-8');
    
        const jsonData = await csvtojson().fromString(csvData);
    
        res.json(jsonData);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
