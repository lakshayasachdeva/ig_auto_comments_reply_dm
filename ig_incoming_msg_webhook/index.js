const express = require('express');
const admin = require('firebase-admin');
const { initializeFirebaseApp } = require('./firebase');
const { handleRequest } = require('./requestHandler');

const app = express();
initializeFirebaseApp(admin);
app.use(express.json());


app.get('/', (req, res) => {
  const challenge = req.query['hub.challenge'];
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe") {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
  res.sendStatus(403);
});

// Pass the admin object to the handleRequest function
const handleRequestWithAdmin = handleRequest(admin);

app.post('/', handleRequestWithAdmin);

exports.receivePayload = app;
