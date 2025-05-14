# 📊 Live Data Stream - Customer Footfall Dashboard

This full-stack application is a real-time dashboard to monitor customer footfall data (customers entering and leaving a store), streamed from Apache Kafka. It visualizes both **live** and **historical** data.

---

## 🛠 Tech Stack

### Frontend:
- ✅ React.js (Next.js)
- ✅ TypeScript
- ✅ Tailwind CSS (Optional)

### Backend:
- ✅ Node.js
- ✅ Express.js
- ✅ TypeScript
- ✅ MongoDB (via Mongoose)
- ✅ Apache Kafka
- ✅ Socket.IO (WebSocket for live updates)

---

## 📦 Features

- 📡 **Real-time Live Table**: Live updates of customers entering or exiting.
- 🕓 **Historical Table**: Aggregated customer data per hour for the past 24 hours.
- 🔌 **Kafka Integration**: Ingests customer movement data from Kafka topics.
- 🗃 **MongoDB Storage**: Stores every Kafka message and aggregates historical data on request.
- ⚡ **WebSocket (Socket.IO)**: Pushes live updates to the frontend instantly.

---

## 📨 Kafka Message Format

```json
{
  "store_id": 10,
  "customers_in": 2,
  "customers_out": 1,
  "time_stamp": "2025-05-14T10:12:03Z"
}
