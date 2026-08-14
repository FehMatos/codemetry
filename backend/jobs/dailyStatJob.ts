import Heartbeat from "../models/Heartbeat";
import DailyStat from "../models/DailyStat";

import {
  getLocalDate,
  buildDailyStat,
  getTodayLocalDate,
} from "../services/dailyStatService";

interface HeartbeatGroup {
  userId: string;
  projectId: string;
  date: string;
  timezone: string;
  heartbeats: any[];
}

async function groupHeartbeatsByDay(
  onlyCompletedDays = false
): Promise<HeartbeatGroup[]> {
  const heartbeats = await Heartbeat.find().sort({ createdAt: 1 });

  const groups = new Map<string, HeartbeatGroup>();

  for (const heartbeat of heartbeats) {
    const date = getLocalDate(heartbeat.createdAt, heartbeat.timezone);

    if (onlyCompletedDays) {
      const today = getTodayLocalDate(heartbeat.timezone);

      if (date === today) {
        continue;
      }
    }

    const key = [
      heartbeat.userId.toString(),
      heartbeat.projectId,
      date,
      heartbeat.timezone,
    ].join("|");

    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.heartbeats.push(heartbeat);
      continue;
    }

    groups.set(key, {
      userId: heartbeat.userId.toString(),
      projectId: heartbeat.projectId,
      date,
      timezone: heartbeat.timezone,
      heartbeats: [heartbeat],
    });
  }

  return Array.from(groups.values());
}
async function generateDailyStats(): Promise<void> {
  const groups = await groupHeartbeatsByDay(true);

  for (const group of groups) {
    const dailyStat = buildDailyStat(
      group.userId,
      group.projectId,
      new Date(`${group.date}T00:00:00Z`),
      group.heartbeats,
      group.timezone
    );

    await DailyStat.findOneAndUpdate(
      {
        userId: group.userId,
        projectId: group.projectId,
        date: dailyStat.date,
      },
      dailyStat,
      {
        upsert: true,
        new: true,
      }
    );
  }
}

export { groupHeartbeatsByDay, generateDailyStats };
