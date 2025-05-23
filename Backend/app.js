import express from "express";

const app = express();

app.use(express.json()); // <-- Place middleware here

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to PranHire API!");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`\nServer is running on port: ${process.env.PORT || 8000}`);
});

export default app;