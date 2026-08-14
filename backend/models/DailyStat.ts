import mongoose, { Schema, Document } from "mongoose";

export interface DailyStatDocument extends Document {
  userId: mongoose.Types.ObjectId;
  projectId: string;
  date: Date;
  timezone: string;
  totalMinutes: number;
  sessions: number;
  languages: LanguageStat[];
  topFiles: TopFileStat[];
  hourlyBreakdown: HourlyBreakdown[];
  createdAt: Date;
  updatedAt: Date;
}

interface LanguageStat {
  name: string;
  minutes: number;
}

interface TopFileStat {
  path: string;
  minutes: number;
}

interface HourlyBreakdown {
  hour: number;
  minutes: number;
  sessions: number;
}

const dailyStatSchema = new Schema<DailyStatDocument>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    totalMinutes: {
      type: Number,
      required: true,
    },
    sessions: {
      type: Number,
      required: true,
    },
    languages: [
      {
        name: {
          type: String,
          required: true,
        },
        minutes: {
          type: Number,
          required: true,
        },
      },
    ],

    topFiles: [
      {
        path: {
          type: String,
          required: true,
        },
        minutes: {
          type: Number,
          required: true,
        },
      },
    ],

    hourlyBreakdown: [
      {
        hour: {
          type: Number,
          required: true,
        },
        minutes: {
          type: Number,
          required: true,
        },
        sessions: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
dailyStatSchema.index({ userId: 1, projectId: 1, date: 1 }, { unique: true });

export default mongoose.model<DailyStatDocument>("DailyStat", dailyStatSchema);
