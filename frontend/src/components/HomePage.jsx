// import React, { useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Homepage.css'; // Make sure to import your CSS file

// const HomePage = () => {
//     const navigate = useNavigate();

//     const startSession = useCallback(() => {
//         const sessionCode = prompt("Enter a session code to start a session:");
//         if (sessionCode) {
//             navigate(`/sender/${sessionCode}`);
//         }
//     }, [navigate]);

//     const joinSession = useCallback(() => {
//         const sessionCode = prompt("Enter a session code to join a session:");
//         if (sessionCode) {
//             navigate(`/receiver/${sessionCode}`);
//         }
//     }, [navigate]);

//     return (
//         <div>
//             {/* Navbar */}
//             <nav className="navbar">
//                 <h1>ClassConnect</h1>
//                 <ul>
//                     <li>Home</li>
//                     <li>About</li>
//                 </ul>
//             </nav>

//             {/* Hero Section */}
//             <div className="hero">
//                 <h2>Welcome to ClassConnect</h2>
//                 <p>Your platform for seamless video communication.</p>
//                 <div className="buttons">
//                     <button onClick={startSession}>Start Session</button>
//                     <button onClick={joinSession}>Join Session</button>
//                 </div>
//             </div>

//             {/* Footer */}
//             <footer className="footer">
//                 <p>&copy; 2023 ClassConnect. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// };

// export default HomePage;

// src/components/HomePage.jsx


// src/components/HomePage.jsx
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Homepage.css'; // Ensure your CSS file is correctly linked

const HomePage = () => {
    const navigate = useNavigate();

    const startSession = useCallback(() => {
        const sessionCode = prompt("Enter a session code to start a session:");
        if (sessionCode) {
            navigate(`/sender/${sessionCode}`); // Navigate to the Sender component
        }
    }, [navigate]);

    const joinSession = useCallback(() => {
        const sessionCode = prompt("Enter a session code to join a session:");
        if (sessionCode) {
            navigate(`/receiver/${sessionCode}`); // Navigate to the Receiver component
        }
    }, [navigate]);

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="hero">
                <h2>Welcome to ClassConnect</h2>
                <p>Your platform for seamless video communication.</p>
                <div className="buttons">
                    <button onClick={startSession}>Start Session</button>
                    <button onClick={joinSession}>Join Session</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2023 ClassConnect. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;