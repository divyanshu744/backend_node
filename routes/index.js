var express = require("express");
var router = express.Router();
var mysql = require("mysql");

// Configure MySQL connection
const db = mysql.createConnection({
  host: "database-1.cv4wyoai8eob.us-east-1.rds.amazonaws.com", // Replace with your database host
  user: "admin", // Replace with your MySQL username
  password: "divyanshu", // Replace with your MySQL password
  database: "cycleCounting", // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* API route to fetch data from the MySQL table */
router.get("/api", (req, res) => {
  const query = "SELECT * FROM Inventory"; // Replace `Inventory` with your table name
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Failed to fetch data from the database" });
    }
    console.log("Fetched Data:", results);
    res.json(results); // Return data as JSON
  });
});

module.exports = router;
