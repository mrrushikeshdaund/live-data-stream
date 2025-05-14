export interface KafkaMessage {
  store_id: string;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

export interface HourlyData {
  hour: string;
  customers_in: number;
  customers_out: number;
}
