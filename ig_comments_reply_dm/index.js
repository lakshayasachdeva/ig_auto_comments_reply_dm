const express = require('express');
const admin = require('firebase-admin');
const { initializeFirebaseApp } = require('./firebase');
const { handleRequest } = require('./requestHandler');

const app = express();
initializeFirebaseApp(admin);

// Pass the admin object to the handleRequest function
const handleRequestWithAdmin = handleRequest(admin);

app.get('/', handleRequestWithAdmin);
exports.receivePayload = app;

