const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(bodyParser.json());

const VERIFY_TOKEN = 'unque_test_token_123'; 

app.get('/webhook', (req, res) => {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Webhook verified successfully!');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});


app.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(function(entry) {
            
            let webhookEvent = entry.changes[0];
            
            
            console.log('New lead received, emitting to app...');
            io.emit('new_lead', webhookEvent.value); 
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

io.on('connection', (socket) => {
    console.log('React Native app connected via WebSocket:', socket.id);
});
io.on('connection', (socket) => {
  console.log('📱 Phone successfully connected to backend!');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server listening on port 3000');
});