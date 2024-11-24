// src/components/SessionComponent.js
import React, { useEffect, useState } from 'react';
import { generateSessionCode } from '../utils/session';

const SessionComponent = () => {
    const [sessionCode, setSessionCode] = useState('');

    useEffect(() => {
        // Generate a unique session code when the component mounts
        const newSessionCode = generateSessionCode();
        setSessionCode(newSessionCode);
    }, []);

    return (
        <div>
            <h1>Your Session Code</h1>
            <p>{sessionCode}</p>
        </div>
    );
};

export default SessionComponent;