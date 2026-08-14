import cron from "node-cron";
import { generateDailyStats } from "../jobs/dailyStatJob";

function startDailyStatScheduler() {
  cron.schedule("5 0 * * *", async () => {
    console.log("Starting daily stat job...");

    try {
      await generateDailyStats();

      console.log("Daily stat job completed successfully.");
    } catch (error) {
      console.error("Error running daily stat job:", error);
    }
  });

  console.log("Daily stat scheduler started.");
}

export default startDailyStatScheduler;
