import { Server } from "socket.io";
import { CustomerEvent } from "./model/CustomerEvent";

export function startKafkaSimulator(io: Server) {
  setInterval(() => {
    const message = {
      store_id: 10,
      customers_in: Math.floor(Math.random() * 3),
      customers_out: Math.floor(Math.random() * 3),
      time_stamp: new Date().toISOString(),
    };

    processKafkaMessage(message);

    io.emit("kafka_message", message);
  }, 5000); // every 5 seconds
}

async function processKafkaMessage(data: any) {
  const { store_id, customers_in, customers_out, time_stamp } = data;
  const timestamp = new Date(); // parse real timestamp

  const event = new CustomerEvent({
    store_id,
    customers_in,
    customers_out,
    timestamp,
  });
  await event.save();
}
