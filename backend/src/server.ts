import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { startKafkaSimulator } from "./kafkaSimulator";
import mongoose from "mongoose";
import { CustomerEvent } from "./model/CustomerEvent";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

mongoose
  .connect("mongodb://localhost:27017/store-db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

app.use(express.json());
app.use(cors());
startKafkaSimulator(io);

app.get("/api/history", async (req, res) => {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const data = await CustomerEvent.aggregate([
    { $match: { timestamp: { $gte: oneDayAgo } } },
    {
      $group: {
        _id: {
          store_id: "$store_id",
          hour: {
            $dateToString: { format: "%Y-%m-%dT%H:00:00Z", date: "$timestamp" },
          },
        },
        customers_in: { $sum: "$customers_in" },
        customers_out: { $sum: "$customers_out" },
      },
    },
    {
      $project: {
        store_id: "$_id.store_id",
        hour: "$_id.hour",
        customers_in: 1,
        customers_out: 1,
        _id: 0,
      },
    },
    { $sort: { hour: -1 } },
  ]);

  res.json(data);
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
