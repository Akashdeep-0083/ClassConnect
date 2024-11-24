// src/utils/session.js
import { v4 as uuidv4 } from 'uuid';

export const generateSessionCode = () => {
    return uuidv4(); // Generates a unique session code
};