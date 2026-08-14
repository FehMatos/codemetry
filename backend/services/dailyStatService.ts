import mongoose from "mongoose";
import { HeartbeatDocument } from "../models/Heartbeat";
import { toZonedTime } from "date-fns-tz";

interface CodingSession {
  start: Date;
  end: Date;
  totalMinutes: number;
}

const SESSION_TIMEOUT_MS = 5 * 60 * 1000;

function calculateSessions(heartbeats: HeartbeatDocument[]): CodingSession[] {
  if (heartbeats.length === 0) {
    return [];
  }

  const sessions: CodingSession[] = [];

  let sessionStart = heartbeats[0].createdAt;
  let sessionEnd = heartbeats[0].createdAt;
  let totalMinutes = 0;

  for (let i = 1; i < heartbeats.length; i++) {
    const previous = heartbeats[i - 1];
    const current = heartbeats[i];

    const gap = current.createdAt.getTime() - previous.createdAt.getTime();

    if (gap <= SESSION_TIMEOUT_MS) {
      totalMinutes += gap / (1000 * 60);
      sessionEnd = current.createdAt;
    } else {
      sessions.push({
        start: sessionStart,
        end: sessionEnd,
        totalMinutes,
      });

      sessionStart = current.createdAt;
      sessionEnd = current.createdAt;
      totalMinutes = 0;
    }
  }

  sessions.push({
    start: sessionStart,
    end: sessionEnd,
    totalMinutes,
  });

  return sessions;
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

function calculateLanguages(heartbeats: HeartbeatDocument[]): LanguageStat[] {
  const languages = new Map<string, number>();

  for (let i = 0; i < heartbeats.length - 1; i++) {
    const current = heartbeats[i];
    const next = heartbeats[i + 1];

    const gap = next.createdAt.getTime() - current.createdAt.getTime();

    if (gap > SESSION_TIMEOUT_MS) {
      continue;
    }

    const minutes = gap / (1000 * 60);

    const currentMinutes = languages.get(current.language) ?? 0;

    languages.set(current.language, currentMinutes + minutes);
  }

  return Array.from(languages.entries())
    .map(([name, minutes]) => ({
      name,
      minutes,
    }))
    .sort((a, b) => b.minutes - a.minutes);
}

function calculateTopFiles(heartbeats: HeartbeatDocument[]): TopFileStat[] {
  const files = new Map<string, number>();

  for (let i = 0; i < heartbeats.length - 1; i++) {
    const current = heartbeats[i];
    const next = heartbeats[i + 1];

    const gap = next.createdAt.getTime() - current.createdAt.getTime();

    if (gap > SESSION_TIMEOUT_MS) {
      continue;
    }

    const minutes = gap / (1000 * 60);

    const currentMinutes = files.get(current.file) ?? 0;

    files.set(current.file, currentMinutes + minutes);
  }

  return Array.from(files.entries())
    .map(([path, minutes]) => ({
      path,
      minutes,
    }))
    .sort((a, b) => b.minutes - a.minutes)
    .slice(0, 4);
}

function calculateHourlyBreakdown(
  heartbeats: HeartbeatDocument[],
  sessions: CodingSession[],
  timezone: string
): HourlyBreakdown[] {
  const hours = new Map<number, { minutes: number; sessions: number }>();

  for (let i = 0; i < heartbeats.length - 1; i++) {
    const current = heartbeats[i];
    const next = heartbeats[i + 1];

    const gap = next.createdAt.getTime() - current.createdAt.getTime();

    if (gap > SESSION_TIMEOUT_MS) {
      continue;
    }

    const minutes = gap / (1000 * 60);

    const localDate = toZonedTime(current.createdAt, timezone);

    const hour = localDate.getHours();

    const currentHour = hours.get(hour) ?? {
      minutes: 0,
      sessions: 0,
    };

    hours.set(hour, {
      minutes: currentHour.minutes + minutes,
      sessions: currentHour.sessions,
    });
  }

  for (const session of sessions) {
    const localDate = toZonedTime(session.start, timezone);

    const hour = localDate.getHours();

    const currentHour = hours.get(hour) ?? {
      minutes: 0,
      sessions: 0,
    };

    hours.set(hour, {
      minutes: currentHour.minutes,
      sessions: currentHour.sessions + 1,
    });
  }

  return Array.from(hours.entries())
    .map(([hour, data]) => ({
      hour,
      minutes: data.minutes,
      sessions: data.sessions,
    }))
    .sort((a, b) => a.hour - b.hour);
}
function buildDailyStat(
  userId: string,
  projectId: string,
  date: Date,
  heartbeats: HeartbeatDocument[],
  timezone: string
) {
  const sessions = calculateSessions(heartbeats);

  const languages = calculateLanguages(heartbeats);

  const topFiles = calculateTopFiles(heartbeats);

  const hourlyBreakdown = calculateHourlyBreakdown(
    heartbeats,
    sessions,
    timezone
  );

  const totalMinutes = sessions.reduce(
    (total, session) => total + session.totalMinutes,
    0
  );

  return {
    userId: new mongoose.Types.ObjectId(userId),
    projectId,
    date,
    timezone,
    totalMinutes,
    sessions: sessions.length,
    languages,
    topFiles,
    hourlyBreakdown,
  };
}

function getLocalDate(date: Date, timezone: string): string {
  const localDate = toZonedTime(date, timezone);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function getTodayLocalDate(timezone: string): string {
  return getLocalDate(new Date(), timezone);
}

export {
  calculateSessions,
  calculateHourlyBreakdown,
  calculateLanguages,
  calculateTopFiles,
  buildDailyStat,
  getLocalDate,
  getTodayLocalDate,
};
