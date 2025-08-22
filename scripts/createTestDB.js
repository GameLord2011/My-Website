import fs from "node:fs";
import sqlite from "node:sqlite";

const dbPath = "../public/tests/testDB.db";

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

//const db = new sqlite.Database(dbPath);

const db = new sqlite.DatabaseSync(dbPath);

db.exec(
  `
  CREATE TABLE guestbook (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT,
    MESSAGE TEXT
  )
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
    }
  },
);

console.log("Table created successfully.");

// Insert test data
const testData = [
  { name: "Alice", message: "Hello, this is a test message!" },
  { name: "Bob", message: "Great to be here!" },
  { name: "Charlie", message: "This is a wonderful guest book!" },
  // Add more test data as needed
];

const insertStmt = db.prepare(
  "INSERT INTO guestbook (NAME, MESSAGE) VALUES (?, ?)",
);
testData.forEach((entry) => {
  insertStmt.run(entry.name, entry.message);
});

console.log("Test data inserted successfully.");

// Close the database connection when done
db.close((err) => {
  if (err) {
    console.error("Error closing the database:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});
