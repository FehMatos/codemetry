import { useState } from "react";
import Main from "./Main";
import Sidebar from "../Sidebar/Sidebar";

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />
        <Main activeTab={activeTab} />
      </div>
    </>
  );
}

export default DashboardLayout;
