import React, { useState } from "react";
import { Folder, Clock, PlusCircle, Download, Upload } from "lucide-react";
import { CollectionTree } from "../../features/collections/CollectionTree";
import { HistoryList } from "../../features/history/HistoryList";

type SidebarTab = "collections" | "history";

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>("collections");

  return (
    <aside className="sidebar">
      {/* Tab Navigation */}
      <div className="tabs" style={{ padding: "0 12px", marginTop: "8px" }}>
        <button
          className={`tab ${activeTab === "collections" ? "active" : ""}`}
          onClick={() => setActiveTab("collections")}>
          <Folder size={16} />
          Collections
        </button>
        <button
          className={`tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}>
          <Clock size={16} />
          History
        </button>
      </div>

      {/* Tab Content */}
      <div className="sidebar-content">
        {activeTab === "collections" && <CollectionTree />}
        {activeTab === "history" && <HistoryList />}
      </div>

      {/* Footer Actions */}
      <div className="sidebar-footer">
        <button className="btn btn-sm" style={{ flex: 1 }}>
          <PlusCircle size={16} />
          New
        </button>
        <button className="btn btn-icon btn-sm">
          <Download size={16} />
        </button>
        <button className="btn btn-icon btn-sm">
          <Upload size={16} />
        </button>
      </div>
    </aside>
  );
};
