import { useEffect, useState } from "react";
import { socket } from "../socket";

interface KafkaMessage {
  store_id: string;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

export default function LiveTable() {
  const [liveData, setLiveData] = useState<KafkaMessage[]>([]);

  useEffect(() => {
    socket.on("kafka_message", (msg: KafkaMessage) => {
      setLiveData((prev) => [msg, ...prev.slice(0, 9)]);
    });
    return () => {
      socket.off("kafka_message");
    };
  }, []);

  return (
    <div>
      <h2>Live Table</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Store</th>
            <th>In</th>
            <th>Out</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {liveData.map((d, i) => (
            <tr key={i}>
              <td>{d.store_id}</td>
              <td>{d.customers_in}</td>
              <td>{d.customers_out}</td>
              <td>{new Date(d.time_stamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
