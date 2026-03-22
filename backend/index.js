const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.USERNAME) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const passwordMatch = bcrypt.compareSync(password, process.env.PASSWORD);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  return res.json({ success: true });
});

app.get("/api/habits", authenticateToken, (req, res) => {
  const { month, year, type } = req.query;
  const stmt = db.prepare(
    "SELECT * FROM habits WHERE month = ? AND year = ? AND type = ?",
  );
  const habits = stmt.all(month, year, type);

  return res.json(habits);
});

app.post("/api/habits/toggle", authenticateToken, (req, res) => {
  const { month, year, type, day } = req.body;
  const existing = db
    .prepare(
      "SELECT * FROM habits WHERE type = ? AND day = ? AND month = ? AND year = ?",
    )
    .get(type, day, month, year);

  if (!existing) {
    db.prepare(
      "INSERT INTO habits (type, day, month, year) VALUES (?, ?, ?, ?)",
    ).run(type, day, month, year);
    return res.json({ success: true, action: "added" });
  } else {
    db.prepare(
      "DELETE FROM habits WHERE type = ? AND day = ? AND month = ? AND year = ?",
    ).run(type, day, month, year);
    return res.json({ success: true, action: "deleted" });
  }
});

app.get("/api/verify", authenticateToken, (req, res) => {
  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
