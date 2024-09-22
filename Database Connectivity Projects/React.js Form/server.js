const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // This loads environment variables from a .env file

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD || "Cnsp2003", // Replace with your MySQL password
  database: "mydatabase",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Handle form submission with file upload
app.post("/submit", upload.single('resume'), (req, res) => {
  const { firstName, lastName, email, contact, gender, selectedOption, subjects, url, about } = req.body;
  const subjectsStr = JSON.stringify(subjects);
  const resumePath = req.file ? req.file.path : null;

  console.log("File path:", resumePath); // Debugging log to check file upload

  const query = `
    INSERT INTO user (firstName, lastName, email, contact, gender, selectedOption, subjects, resume, url, about)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [firstName, lastName, email, contact, gender, selectedOption, subjectsStr, resumePath, url, about],
    (err, result) => {
      if (err) {
        console.error("Error inserting data: ", err);
        res.status(500).json({ error: "Error inserting data: " + err.message });
      } else {
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Form submitted successfully!" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
