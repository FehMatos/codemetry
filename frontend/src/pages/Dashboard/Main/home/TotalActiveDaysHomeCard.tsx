import { Activity } from "lucide-react";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";

export default function TotalActiveDaysCard() {
  return (
    <div className="col-span-2 hover:-translate-y-2 transition-all duration-300">
      <Card className="h-41">
        <CardHeader
          title="Total active days"
          subtitle="Across all projects"
          icon={Activity}
        />

        <div className="">
          <p className="flex mt-4 text-3xl font-semibold text-text-primary">
            47{" "}
            <span className="text-xs mt-3 m-1 font-medium text-text-secondary">
              days
            </span>
          </p>{" "}
        </div>
      </Card>
    </div>
  );
}
