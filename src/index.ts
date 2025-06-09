import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.FRONT_END_URL }));

app.get("/", (_req, res) => {
  res.send("App is running...");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
