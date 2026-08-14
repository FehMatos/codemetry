import { Clock } from "lucide-react";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
export default function TotalCodingTimeCard() {
  return (
    <div className="col-span-2 hover:-translate-y-2 transition-all duration-300 *- ">
      <Card className="h-41">
        <CardHeader title="Total coding time" icon={Clock} />
        <div className="">
          <p className="flex mt-8 text-3xl font-semibold text-text-primary">
            1204{" "}
            <span className="text-xs mt-3 m-1 font-medium text-text-secondary">
              hours
            </span>
          </p>{" "}
        </div>
      </Card>
    </div>
  );
}
