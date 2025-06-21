const fs = require('fs');
const path = require('path');

// Log file path
const logFilePath = path.join(__dirname, 'logger.txt');

// Logger function
function logMessage(message) {
    const timestamp = new Date().toISOString();
    const fullLog = `[${timestamp}] ${message}\n`;

    // Append the log to the file
    fs.appendFile(logFilePath, fullLog, (err) => {
        if (err) console.error("Failed to write log:", err.message);
    });
}

module.exports = logMessage;