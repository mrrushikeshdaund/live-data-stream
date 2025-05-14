import React, { useEffect, useState } from "react";
import { HourlyData } from "../Types";
const HistoryTable = () => {
  const [historyData, setHistoryData] = useState<HourlyData[]>([]);

  useEffect(() => {
    // Simulating an API call

    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    const response = await fetch("http://localhost:4000/api/history");
    const data = await response.json();
    setHistoryData(data);
    console.log(data);
  };

  return (
    <div>
      <h2>History Table (Last 24h)</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Hour</th>
            <th>In</th>
            <th>Out</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.hour}</td>
              <td>{entry.customers_in}</td>
              <td>{entry.customers_out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
