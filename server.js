const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

//creat file
app.post('/userSync/:username', (req, res) => { 
    const { username } = req.params;
    const userFile = fs.writeFileSync(`./${username}.txt`, "hello world! Sync");
    res.json({message:"file created using wriyeFileSync"})

});

app.post('/userAsync/:username', (req, res) => { 
    const { username } = req.params;
    fs.writeFile(`./${username}.txt`, "hello world! Async", (err) => { 
        if (err) throw err;
    });
    res.json({message:"file created using writeFile"})

});

//read file
app.get('/readSync/:username', (req, res) => { 
    const { username } = req.params; 
    const userFile = fs.readFileSync(`./${username}.txt`, 'utf-8');
    res.send(userFile);
});

app.get('/readAsync/:username', (req, res) => { 
    const { username } = req.params; 
    fs.readFile(`./${username}.txt`, 'utf-8', (err, data) => {
        if (err) throw err;
        res.send(data); 
     });
});

//update file
app.get('/updateSync/:username', (req, res) => {
    const { username } = req.params;
    const updateFile = fs.appendFileSync(`./${username}.txt`, "\nupdated the file with Sync");
    res.json({ message: "File updated!" });
});

app.get('/updateAsync/:username', (req, res) => {
    const { username } = req.params;
    fs.appendFileSync(`./${username}.txt`, "\nupdated the file with Async", (err) => {
        if (err) throw err;
    });
    res.json({ message: "File updated!" });
});

//delete file
app.get("/deleteSync/:username", (req, res) => {
    const { username } = req.params;
    fs.unlinkSync(`./${username}.txt`);
    res.json({ message: "File Deleted!" });
});

app.get("/deleteAsync/:username", (req, res) => {
    const { username } = req.params;
    fs.unlink(`./${username}.txt`, (err) => {
        if (err) throw err;
    });
    res.json({ message: "File Deleted!" });

})

app.get('/', (req, res) => { 
    res.send("i am root");
});


app.listen(8080, () => {
    console.log("listening to port 8080");
});