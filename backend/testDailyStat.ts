import {
  calculateSessions,
  calculateLanguages,
  calculateTopFiles,
  calculateHourlyBreakdown,
} from "./services/dailyStatService";
import { buildDailyStat } from "./services/dailyStatService";

function createHeartbeat(
  date: string,
  language: string,
  file: string,
  timezone: string
) {
  return {
    createdAt: new Date(date),
    language,
    file,
    timezone,
  } as any;
}
const heartbeats = [
  createHeartbeat(
    "2026-08-13T10:55:00Z",
    "TypeScript",
    "Dashboard.tsx",
    "America/Sao_Paulo"
  ),
  createHeartbeat(
    "2026-08-13T10:57:00Z",
    "TypeScript",
    "Dashboard.tsx",
    "America/Sao_Paulo"
  ),
  createHeartbeat(
    "2026-08-13T10:59:00Z",
    "CSS",
    "Dashboard.css",
    "America/Sao_Paulo"
  ),
  createHeartbeat(
    "2026-08-13T11:01:00Z",
    "TypeScript",
    "Dashboard.tsx",
    "America/Sao_Paulo"
  ),
  createHeartbeat(
    "2026-08-13T11:03:00Z",
    "TypeScript",
    "Dashboard.tsx",
    "America/Sao_Paulo"
  ),

  createHeartbeat(
    "2026-08-13T11:11:00Z",
    "TypeScript",
    "Sidebar.tsx",
    "America/Sao_Paulo"
  ),
  createHeartbeat(
    "2026-08-13T11:13:00Z",
    "TypeScript",
    "Sidebar.tsx",
    "America/Sao_Paulo"
  ),
];

const languages = calculateLanguages(heartbeats);

const topFiles = calculateTopFiles(heartbeats);

const timezone = "Europe/Lisbon";

const sessions = calculateSessions(heartbeats);

const dailyStat = buildDailyStat(
  "6a7c68c1843522bb8b16e485",
  "github.com/FehMatos/Codemetry",
  new Date("2026-08-13T00:00:00Z"),
  heartbeats,
  "America/Sao_Paulo"
);

console.log(dailyStat);
