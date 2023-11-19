const express = require('express');
const csvtojson = require('csvtojson');
const fs = require('fs');
const cors = require('cors')

// const csvFilePath = require('./dataFiles/data.csv');
const app = express();
const port = 3000; 
const postData = require('./dataFiles/data.json')

const allowedOrigins = ['https://visual-master-frontend.vercel.app/'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

const filterData=(data,age, gender,startDate,endDate)=> {
    let filteredData = data;
    
    if (startDate && endDate) {
        filteredData = filteredData.filter(item => {
          return item.Day >= startDate  && item.Day <= endDate;
        }
        );
    }   
    if (age) {
      filteredData = filteredData.filter(item => item.Age === age);
    }
    if (gender) {
      filteredData = filteredData.filter(item => item.Gender === gender);
    }
    return filteredData;
  }

app.get('/api/data',async (req, res) => {
    const {age,gender,startDate,endDate} = req.query
    try {
        // const csvData = await fs.promises.readFile(csvFilePath, 'utf-8');
    
        // const jsonData = await csvtojson().fromString(csvData);
    
        const filterDataValue = filterData(postData,age,gender,startDate,endDate)
        
        res.json(filterDataValue)

      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
