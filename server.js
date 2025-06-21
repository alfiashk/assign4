const { error } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');
const logMessage = require("./logger");
app.use(express.json());

app.use(express.json());

app.use((req, res, next) => {
    logMessage(`${req.method} ${req.url}`);
    next();
});

//creat file
app.post('/userSync/:username', (req, res) => { 
    const { username } = req.params;
    try {
        fs.writeFileSync(`./${username}.txt`, "hello world! Sync");
        logMessage("File created using Sync function");
        res.json({ message: "file created using wriyeFileSync" });
    } catch (err) {
        logMessage("Failed to read file using Sync Function");
        res.json({ error: err.message });
    }
    
});

app.post('/userAsync/:username', (req, res) => { 
    const { username } = req.params;
        fs.writeFile(`./${username}.txt`, "hello world! Async", (err) => { 
            if (err) {
                logMessage("Failed to create file using Async Function");
                return res.json({error: "Failed to create file"})
            }
        logMessage("File created using Async function");
        res.json({message:"file created using writeFile"})
        });
    
});

//read file
app.get('/readSync/:username', (req, res) => { 
    const { username } = req.params; 
    try {
        const userFile = fs.readFileSync(`./${username}.txt`, 'utf-8');
        logMessage("File read using Sync function");
        res.send(userFile);
    } catch (err) {
        logMessage("Failed to read file using Sync Function");
        res.json({ error: err.message });
    }
});

app.get('/readAsync/:username', (req, res) => { 
    const { username } = req.params; 
        fs.readFile(`./${username}.txt`, 'utf-8', (err, data) => {
            if (err) {
                logMessage("Failed to read file using Async Function");
                return res.json({error: "Failed to read file"})
            }
            res.send(data); 
        });
        logMessage("File read using Async function");
        res.json({ error: err.message });
});

//update file
app.get('/updateSync/:username', (req, res) => {
    const { username } = req.params;
    try {
        const updateFile = fs.appendFileSync(`./${username}.txt`, "\nupdated the file with Sync");
        logMessage("File read using Sync function");
        res.json({ message: "File updated!" });
    } catch (error) {
        logMessage("Failed to update file using Sync Function");
        res.json({ error: err.message });
    }
    
});

app.get('/updateAsync/:username', (req, res) => {
    const { username } = req.params;
        fs.appendFileSync(`./${username}.txt`, "\nupdated the file with Async", (err) => {
            if (err) {
                logMessage("Failed to update file using Async Function");
                return res.json({error: "Failed to update file"})
            }
        logMessage("File read using Async function");
        res.json({ message: "File updated!" });

        });
    
});

//delete file
app.get("/deleteSync/:username", (req, res) => {
    const { username } = req.params;
    try {
        fs.unlinkSync(`./${username}.txt`);
        logMessage("File deleted using Sync function");
        res.json({ message: "File Deleted!" });
    } catch (error) {
        logMessage("Failed to delete file using Sync Function");
        res.json({ error: err.message });
    }
});

app.get("/deleteAsync/:username", (req, res) => {
    const { username } = req.params;
        fs.unlink(`./${username}.txt`, (err) => {
            if (err) {
                logMessage("Failed to delete file using Async function");
                return res.json({error: "Failed to update file"})
            }
            logMessage("File deleted using Async function");
            res.json({ message: "File Deleted!" });
        });
});

app.get('/logger', (req, res) => {
    try {
        let logfile = fs.readFileSync("logger.txt", "utf-8");
        logMessage("Logger file viewed");
        res.send(logfile);
    } catch (error) {
        logMessage("Something went wrong while viewing Logger file");
        res.json({ error: "something went wrong" });
    }
});

app.get('/', (req, res) => { 
    logMessage("Root endpoint hit");
    res.send("i am root");
});


app.listen(8080, () => {
    console.log("listening to port 8080");
});