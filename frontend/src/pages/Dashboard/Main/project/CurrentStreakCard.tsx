import { Flame } from "lucide-react";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";

export default function CurrentStreakCard() {
  return (
    <div className="col-span-2 transition-all duration-300 hover:-translate-y-2">
      <Card size="md" className="">
        <CardHeader title="Current Streak" icon={Flame} />

        <div className="flex flex-col items-center justify-center">
          <p className="mt-18 flex items-end gap-1 text-5xl font-semibold text-text-primary">
            <Flame className="mb-1 w-9 h-9 text-primary" /> 14
            <span className="mb-1 text-xs font-medium text-text-secondary">
              days
            </span>
          </p>
        </div>
        <div className="mt-1 items-center justify-center flex-col flex text-text-secondary">
          <p className="text-[11px] font-bold">
            11 days <span className="font-medium">longest streak</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
