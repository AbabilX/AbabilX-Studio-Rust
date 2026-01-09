import React, { useState } from "react";
import { Folder, Clock, PlusCircle, Download, Upload } from "lucide-react";
import { CollectionTree } from "../../features/collections/CollectionTree";
import { HistoryList } from "../../features/history/HistoryList";

type SidebarTab = "collections" | "history";

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>("collections");

  return (
    <aside style={{
      width: "var(--sidebar-width)",
      height: "100vh",
      background: "var(--bg-primary)",
      borderRight: "1px solid var(--border-color)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Tab Navigation */}
      <div className="tabs" style={{
        padding: "0 12px",
        marginTop: "8px"
      }}>
        <button
          className={`tab ${activeTab === "collections" ? "active" : ""}`}
          onClick={() => setActiveTab("collections")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <Folder size={16} />
          Collections
        </button>
        <button
          className={`tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <Clock size={16} />
          History
        </button>
      </div>

      {/* Tab Content */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "12px"
      }}>
        {activeTab === "collections" && <CollectionTree />}
        {activeTab === "history" && <HistoryList />}
      </div>

      {/* Footer Actions */}
      <div style={{
        padding: "12px",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        gap: "8px"
      }}>
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
