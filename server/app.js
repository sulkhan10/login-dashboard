const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const port = 3000;

const brokerUrl = 'mqtt://broker.address.com';
const clientId = 'clientId';
const username = 'username';
const password = 'password';

let client = null;

const connectMqtt = () => {
  client = mqtt.connect(brokerUrl, {
    clientId,
    username,
    password
  });

  client.on('connect', () => {
    console.log('MQTT connected');
  });

  client.on('error', (error) => {
    console.log(`MQTT error: ${error}`);
  });
};

const publishDummyData = () => {
  const data = {
    suhu: parseFloat((Math.random() * 10 + 20).toFixed(2)),
    kelembaban: parseFloat((Math.random() * 40 + 50).toFixed(2)),
    tekanan_udara: parseFloat((Math.random() * 200 + 900).toFixed(2))
  };

  client.publish('topic/data', JSON.stringify(data), () => {
    console.log('Data published:', data);
  });
};

app.post('/start', jsonParser, (req, res) => {
    if (client === null) {
      connectMqtt();
    }
  
    if (req.body.interval && req.body.interval > 0) {
      const intervalId = setInterval(publishDummyData, req.body.interval * 1000);
      res.status(200).json({ message: `Dummy data started with interval ${req.body.interval} seconds` });
    } else {
      res.status(400).json({ message: 'Invalid interval parameter' });
    }
  });
  
  app.post('/stop', (req, res) => {
    if (client !== null) {
      client.end();
      client = null;
    }
  
    res.status(200).json({ message: 'Dummy data stopped' });
  });
  
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  