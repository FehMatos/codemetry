import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import { SquareActivity } from "lucide-react";
export default function TotalActiveDaysCard() {
  return (
    <div className="w-full hover:-translate-y-2 transition-all duration-300">
      <Card size="sm">
        <CardHeader title="Total active days" icon={SquareActivity} />
        <div className="">
          <p className="flex mt-8 text-3xl font-semibold text-text-primary">
            14{" "}
            <p className="text-xs mt-3 m-1 font-medium text-text-secondary">
              days
            </p>
          </p>{" "}
          <div className="text-end">
            <p className="text-xs text-text-secondary mt-4">
              last active{" "}
              <span className="font-bold text-text-secondary">14</span> days ago
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
