import mongoose from "mongoose";
import { BetEntity } from "../types";

const { model, models, Schema } = mongoose;

const BetSchema = new Schema<BetEntity>(
  {
    sport: {
      type: String,
      required: true,
    },
    tournament: {
      type: String,
      required: false,
    },
    tournamentName: {
      type: String,
      required: false,
    },
    home: {
      type: String,
      required: false,
    },
    away: {
      type: String,
      required: false,
    },
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
const Bet = models.Bet || model<BetEntity>("Bet", BetSchema);

export { Bet };
