const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User ' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);