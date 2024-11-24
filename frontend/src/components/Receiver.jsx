// // src/components/Receiver.jsx
// import React, { useEffect } from 'react';

// const Receiver = () => {
//     useEffect(() => {
//         const domain = 'meet.jit.si'; // Change to your Jitsi server if needed
//         const options = {
//             roomName: 'YourRoomName', // Specify the same room name as Sender
//             width: '100%',
//             height: '100%',
//             parentNode: document.getElementById('jitsi-receiver'),
//             configOverwrite: { startWithVideoMuted: true },
//         };

//         const api = new window.JitsiMeetExternalAPI(domain, options);

//         return () => {
//             api.dispose(); // Cleanup on unmount
//         };
//     }, []);

//     return (
//         <div id="jitsi-receiver" style={{ height: '500px', width: '100%' }}></div>
//     );
// };

// export default Receiver;

// // src/components/Receiver.jsx
// // src/components/Receiver.jsx
// // src/components/Receiver.jsx
// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';

// const Receiver = () => {
//     const { sessionCode } = useParams();
//     const [messages, setMessages] = useState([]);
//     const socketRef = useRef(null);

//     // Move message handler to useCallback
//     const handleMessage = useCallback((message) => {
//         console.log('Message from server:', message);
//         setMessages(prevMessages => [...prevMessages, message]);
//     }, []);

//     useEffect(() => {
//         if (!sessionCode) return;

//         try {
//             socketRef.current = io('http://localhost:5000');
            
//             // Connect with session code
//             socketRef.current.emit('join-session', sessionCode);

//             // Handle incoming messages
//             socketRef.current.on('message', handleMessage);

//             // Handle errors
//             socketRef.current.on('error', (error) => {
//                 console.error('Socket error:', error);
//             });

//         } catch (error) {
//             console.error('Error connecting to socket server:', error);
//         }

//         // Cleanup function
//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.off('message', handleMessage);
//                 socketRef.current.disconnect();
//             }
//         };
//     }, [sessionCode, handleMessage]);

//     return (
//         <div>
//             <h2>Receiver - Session Code: {sessionCode}</h2>
//             <div>
//                 <h3>Messages:</h3>
//                 <ul>
//                     {messages.map((msg, index) => (
//                         <li key={`message-${index}`}>{msg}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Receiver;

// src/components/Receiver.jsx

// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
// import io from 'socket.io-client';
// import './Receiver.css';
// import Navbar from './Navbar'; // Import the Navbar component


// const Receiver = () => {
//     const { sessionCode } = useParams();
//     const [messages, setMessages] = useState([]);
//     const socketRef = useRef(null);
//     const jitsiRef = useRef(null); // Ref to store Jitsi API instance
//     const navigate = useNavigate(); // Initialize useNavigate

//     // Move message handler to useCallback
//     const handleMessage = useCallback((message) => {
//         console.log('Message from server:', message);
//         setMessages(prevMessages => [...prevMessages, message]);
//     }, []);

//     useEffect(() => {
//         if (!sessionCode) return;

//         // Initialize socket connection
//         try {
//             socketRef.current = io('http://localhost:5000');
//             socketRef.current.emit('join-session', sessionCode);
//             socketRef.current.on('message', handleMessage);
//             socketRef.current.on('error', (error) => {
//                 console.error('Socket error:', error);
//             });
//         } catch (error) {
//             console.error('Error connecting to socket server:', error);
//         }

//         // Cleanup socket connection
//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.off('message', handleMessage);
//                 socketRef.current.disconnect();
//             }
//         };
//     }, [sessionCode, handleMessage]);

//     // Jitsi Meet API initialization
//     useEffect(() => {
//         const domain = 'meet.jit.si';
//         const options = {
//             roomName: sessionCode, // Use the session code as the room name
//             width: '100%',
//             height: '500px',
//             parentNode: document.getElementById('jitsi-receiver'),
//             configOverwrite: {
//                 startWithVideoMuted: true,
//                 startWithAudioMuted: false,
//                 disableAudioLevels: true,
//                 disableVideoQualityLabel: true,
//                 disablePolls: true,
//                 disableChat: false,
//                 disableInvite: true,
//                 disableParticipantStatus: true,
//                 disableRecording: true,
//                 disableVideo: true,
//             },
//             interfaceConfigOverwrite: {
//                 TOOLBAR_BUTTONS: [
//                     'microphone', 'screenSharing', 'chat', 'raiseHand', 'emoji' // Customize buttons
//                 ],
//             },
//         };

//         // Initialize Jitsi Meet API
//         jitsiRef.current = new window.JitsiMeetExternalAPI(domain, options);

//         return () => {
//             jitsiRef.current.dispose(); // Cleanup on unmount
//         };
//     }, [sessionCode]);

//     // Leave Meeting Function
//     const leaveMeeting = () => {
//         if (jitsiRef.current) {
//             jitsiRef.current.dispose(); // Dispose of the Jitsi API instance
//         }
//         navigate('/'); // Navigate back to the home page or any other route
//     };

//     return (
//         <div className="page-container">
//             <Navbar />
//             <div className="jitsi-container">
//                 <h2>Receiver - Session Code: {sessionCode}</h2>
//                 <div id="jitsi-receiver" style={{ height: '500px', width: '100%' }}></div>
//             </div>
//         </div>
//     );
// };

// export default Receiver;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Navbar from './Navbar'; // Ensure this path is correct
import './Receiver.css'; // Ensure this path is correct

const Receiver = () => {
    const { sessionCode } = useParams();
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const jitsiRef = useRef();
    const navigate = useNavigate();

    // Message handler
    const handleMessage = useCallback((message) => {
        console.log('Message from server:', message);
        setMessages(prevMessages => [...prevMessages, message]);
    }, []);

    useEffect(() => {
        if (!sessionCode) return;

        // Initialize socket connection
        try {
            socketRef.current = io('http://localhost:5000'); // Ensure your Socket.IO server is running
            socketRef.current.emit('join-session', sessionCode);

            // Handle incoming messages
            socketRef.current.on('message', handleMessage);

            // Handle errors
            socketRef.current.on('error', (error) => {
                alert(error); // Display error message to the user
                navigate('/'); // Navigate back to the home page or another route
            });
        } catch (error) {
            console.error('Error connecting to socket server:', error);
        }

        // Cleanup socket connection
        return () => {
            if (socketRef.current) {
                socketRef.current.off('message', handleMessage);
                socketRef.current.disconnect();
            }
        };
    }, [sessionCode, handleMessage, navigate]);

    // Initialize Jitsi Meet API
    useEffect(() => {
        if (!sessionCode) return;

        const domain = 'meet.jit.si';
        const options = {
            roomName: sessionCode,
            width: '100%',
            height: '100%',
            parentNode: document.getElementById('jitsi-receiver'),
            configOverwrite: {
                startWithVideoMuted: true,
                disableVideo: true, // Disable video
                toolbarButtons: [
                    'microphone', // Show microphone button
                    'chat', // Show chat button
                    'emoji' // Show emoji button
                ],
                // Additional options to hide other features
                filmStripOnly: true, // Only show the filmstrip (if applicable)
                disableInvite: true, // Disable invite button
                disablePolls: true, // Disable polls
                disableRecording: true, // Disable recording
                disableScreensharing: true, // Disable screen sharing
                disableVideoQualityLabel: true, // Disable video quality label
                disableKick: true, // Disable kick option
                disableParticipants: true, // Disable participants list
            },
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

    // Leave Meeting Function
    const leaveMeeting = () => {
        if (jitsiRef.current) {
            jitsiRef.current.dispose(); // Dispose of the Jitsi API instance
        }
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="jitsi-container">
                <h2>Receiver - Session Code: {sessionCode}</h2>
                <div id="jitsi-receiver" style={{ height: '500px', width: '100%' }}></div>
                <button className="leave-meeting-button" onClick={leaveMeeting}>
                    Leave Meeting
                </button>
            </div>
        </div>
    );
};

export default Receiver;