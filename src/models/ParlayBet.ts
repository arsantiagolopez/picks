import mongoose from "mongoose";
import { ParlayBetEntity } from "../types";

const { model, models, Schema } = mongoose;

const ParlayBetSchema = new Schema<ParlayBetEntity>(
  {
    startTime: {
      type: Date,
      required: true,
    },
    wager: {
      type: String,
      required: true,
    },
    odds: {
      american: {
        type: Number,
        required: true,
      },
      decimal: {
        type: Number,
        required: true,
      },
    },
    stake: {
      type: Number,
      required: true,
    },
    returns: {
      type: Number,
      required: true,
    },
    reasoning: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite upon initial compile
const ParlayBet =
  models.ParlayBet || model<ParlayBetEntity>("ParlayBet", ParlayBetSchema);

export { ParlayBet };
