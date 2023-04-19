const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5050;

const folderPath = "./text-files";

// Endpoint to create a text file with the current timestamp
app.post("/create-file", (req, res) => {
  const date = new Date();
  //   const filename = `${date.toISOString()}.txt`;
  var timestamp = new Date();
  const filename =
    timestamp.getDate() +
    "-" +
    timestamp.getHours() +
    timestamp.getMinutes() +
    timestamp.getSeconds()+".txt";
  const content = date.toString();

  fs.writeFile(path.join(folderPath, filename), content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating file");
    } else {
      console.log(`File ${filename} created successfully`);
      res.send(`File ${filename} created successfully`);
    }
  });
});

// Endpoint to retrieve all text files in the folder
app.get("/get-files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving files");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
      console.log(`${textFiles.length} text files found`);
      res.send(textFiles);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
