import CardHeader from "@/components/CardHeader";
import { Braces, Clock, Code, Flame } from "lucide-react";

import Card from "@/components/Card";
export default function MostActiveProjectCard() {
  return (
    <div className="col-span-4 hover:-translate-y-2 transition-all duration-300 ">
      <Card className="h-52">
        <CardHeader title="Most Active Project" icon={Braces} />
        <div className="">
          <p className="flex mt-8 text-3xl font-semibold text-text-primary cursor-pointer">
            Readen
            {/* //////////////// TODO: AO CLICAR NO NOME, IR PARA A TAB DO PROJETO */}
          </p>{" "}
        </div>{" "}
        <div className="flex mt-8">
          <p className="m-1 rounded-full p-2 bg-background text-xs flex cursor-pointer hover:bg-black/20">
            <Clock className="w-4 h-4 mr-1 text-text-secondary" /> 12h 40m this
            week
          </p>
          <p className="m-1 rounded-full p-2 bg-background text-xs flex cursor-pointer hover:bg-black/20">
            <Flame className="w-4 h-4 mr-1 text-text-secondary" /> 7 days
            current streak{" "}
          </p>{" "}
          <p className="m-1 rounded-full p-2 bg-background text-xs flex cursor-pointer hover:bg-black/20">
            {" "}
            <Code className="w-4 h-4 mr-1 text-text-secondary" />
            TypeScript, React, Node, more
          </p>
        </div>
      </Card>
    </div>
  );
}
