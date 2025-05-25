import express from "express";

const app = express();
import cors from "cors";

app.use(express.json()); // <-- Place middleware here
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // if you use cookies
}));
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to PranHire API!");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`\nServer is running on port: ${process.env.PORT || 8000}`);
});

export default app;