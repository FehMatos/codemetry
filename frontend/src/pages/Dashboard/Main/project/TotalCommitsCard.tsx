import { GitCommitHorizontal } from "lucide-react";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
export default function TotalCommitsCard() {
  return (
    <div className="col-span-2 hover:-translate-y-2 transition-all duration-300">
      <Card className="h-35">
        <CardHeader title="Total commits" icon={GitCommitHorizontal} />
        <div className="">
          <p className="flex mt-4 text-3xl font-semibold text-text-primary">
            12{" "}
            <span className="text-xs mt-3 m-1 font-medium text-text-secondary">
              commits
            </span>
          </p>{" "}
        </div>
      </Card>
    </div>
  );
}
