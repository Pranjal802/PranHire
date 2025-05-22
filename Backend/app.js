import express from "express";

const app = express();

app.use(express.json()); // <-- Place middleware here

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to PranHire API!");
});

export default app;