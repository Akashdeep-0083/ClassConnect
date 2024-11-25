// // server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const WebSocket = require('ws');
// const authRoutes = require('./routes/auth');

// const app = express();
// app.use(express.json()); // Middleware to parse JSON requests

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// // Use authentication routes
// app.use('/api/auth', authRoutes);

// // WebSocket server
// const wss = new WebSocket.Server({ noServer: true });

// wss.on('connection', (ws) => {
//     console.log('New client connected');

//     ws.on('message', (message) => {
//         console.log(`Received message: ${message}`);
//         // Broadcast the message to all clients
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     });

//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });

// // Upgrade HTTP server to handle WebSocket connections
// const server = app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 5000}`);
// });

// server.on('upgrade', (request, socket, head) => {
//     wss.handleUpgrade(request, socket, head, (ws) => {
//         wss.emit('connection', ws, request);
//     });
// });

// server.js


// server.js

// server.js

// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const sessions = {}; // Object to store session states

io.on('connection', (socket) => {
    console.log('New client connected');

    // Event for joining a session
    socket.on('join-session', (sessionCode) => {
        if (sessions[sessionCode]) {
            // If session exists
            if (!sessions[sessionCode].moderator) {
                // If no moderator, the first joiner becomes the moderator
                sessions[sessionCode].moderator = socket.id;
                socket.join(sessionCode);
                socket.emit('joined', { role: 'moderator' });
                console.log(`New moderator joined session: ${sessionCode}`);
            } else {
                // If a moderator is already present, join as a student
                sessions[sessionCode].students.push(socket.id);
                socket.join(sessionCode);
                socket.emit('joined', { role: 'student' });
                console.log(`Student joined session: ${sessionCode}`);
            }
        } else {
            // If session does not exist, create a new one
            sessions[sessionCode] = { moderator: socket.id, students: [] };
            socket.join(sessionCode);
            socket.emit('joined', { role: 'moderator' });
            console.log(`New moderator joined session: ${sessionCode}`);
        }
    });

    // Event for starting a session
    socket.on('start-session', (sessionCode) => {
        if (sessions[sessionCode]) {
            // If the session already exists, send an error
            socket.emit('error', { message: 'Session already exists. Please join instead.' });
        } else {
            // Create a new session and set the sender as the moderator
            sessions[sessionCode] = { moderator: socket.id, students: [] };
            socket.join(sessionCode);
            socket.emit('started', { role: 'moderator' });
            console.log(`Session started: ${sessionCode} with moderator: ${socket.id}`);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        // Clean up session if moderator disconnects
        for (const code in sessions) {
            if (sessions[code].moderator === socket.id) {
                delete sessions[code]; // Remove session if moderator disconnects
                console.log(`Moderator disconnected from session: ${code}`);
            } else {
                // Remove student from the session
                sessions[code].students = sessions[code].students.filter(id => id !== socket.id);
            }
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));