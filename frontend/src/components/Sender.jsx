// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { useParams } from 'react-router-dom';

// const Sender = () => {
//     const { sessionCode } = useParams();
//     const [messages, setMessages] = useState([]);
//     const wsRef = useRef();
//     const jitsiRef = useRef();

//     // Move WebSocket message handler to useCallback
//     const handleWebSocketMessage = useCallback((event) => {
        
//         console.log('Message from server:', event.data);
//         setMessages(prevMessages => [...prevMessages, event.data]);
//     }, []);

//     // Initialize WebSocket in a separate useEffect
//     useEffect(() => {

//         const ws = new WebSocket('ws://localhost:8080');
//         console.log(ws);
        
//         wsRef.current = ws;

//         ws.onopen = () => {
//             console.log('WebSocket connection established');
//         };

//         ws.onmessage = handleWebSocketMessage;

//         ws.onclose = () => {
//             console.log('WebSocket connection closed');
//         };

//         return () => {
//             if (wsRef.current) {
//                 wsRef.current.close();
//             }
//         };
//     }, [handleWebSocketMessage]);

//     // Initialize Jitsi in a separate useEffect
//     useEffect(() => {
//         if (!sessionCode) return;

//         const domain = 'meet.jit.si';
//         const options = {
//             roomName: sessionCode,
//             width: '100%',
//             height: '100%',
//             parentNode: document.getElementById('jitsi-sender'),
//             configOverwrite: { startWithVideoMuted: false },
//         };

//         try {
//             jitsiRef.current = new window.JitsiMeetExternalAPI(domain, options);
//         } catch (error) {
//             console.error('Error initializing Jitsi:', error);
//         }

//         return () => {
//             if (jitsiRef.current) {
//                 jitsiRef.current.dispose();
//             }
//         };
//     }, [sessionCode]);

//     return (
//         <div className="page-container">
//             <Navbar />
//             <div className="jitsi-container">
//                 <h2>Sender - Session Code: {sessionCode}</h2>
//                 <div id="jitsi-sender" style={{ height: '500px', width: '100%' }}></div>
//             </div>
//         </div>
//     );
// };

// export default Sender;

// src/components/HomePage.jsx


// src/components/Sender.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; // Ensure this path is correct
import './Sender.css'; // Ensure this path is correct
import io from 'socket.io-client'; // Ensure you have this installed

const Sender = () => {
    const { sessionCode } = useParams();
    const [messages, setMessages] = useState([]);
    const wsRef = useRef();
    const jitsiRef = useRef();

    // WebSocket message handler
    const handleWebSocketMessage = useCallback((event) => {
        console.log('Message from server:', event.data);
        setMessages(prevMessages => [...prevMessages, event.data]);
    }, []);

    // Initialize WebSocket in a useEffect
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080'); // Ensure your WebSocket server is running
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connection established');
            ws.send(JSON.stringify({ type: 'join', sessionCode })); // Send join message
        };

        ws.onmessage = handleWebSocketMessage;

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [handleWebSocketMessage, sessionCode]);

    // Initialize Jitsi Meet API
    useEffect(() => {
        if (!sessionCode) return;

        const domain = 'meet.jit.si';
        const options = {
            roomName: sessionCode,
            width: '100%',
            height: '100%',
            parentNode: document.getElementById('jitsi-sender'),
            configOverwrite: { startWithVideoMuted: false },
        };

        try {
            jitsiRef.current = new window.JitsiMeetExternalAPI(domain, options);
        } catch (error) {
            console.error('Error initializing Jitsi:', error);
        }

        return () => {
            if (jitsiRef.current) {
                jitsiRef.current.dispose();
            }
        };
    }, [sessionCode]);

    return (
        <div className="page-container">
            <Navbar />
            <div className="jitsi-container">
                <h2>Sender - Session Code: {sessionCode}</h2>
                <div id="jitsi-sender" style={{ height: '500px', width: '100%' }}></div>
            </div>
        </div>
    );
};

export default Sender;