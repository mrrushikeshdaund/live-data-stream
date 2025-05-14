import mongoose from "mongoose";

const customerEventSchema = new mongoose.Schema({
  store_id: Number,
  customers_in: Number,
  customers_out: Number,
  timestamp: { type: Date, default: Date.now },
});

export const CustomerEvent = mongoose.model(
  "CustomerEvent",
  customerEventSchema
);

export type CustomerEventType = {
  store_id: number;
  customers_in: number;
  customers_out: number;
  timestamp: Date;
};
