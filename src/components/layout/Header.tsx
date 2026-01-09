import React from "react";
import { Settings, Globe } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header style={{
      height: "var(--header-height)",
      borderBottom: "1px solid var(--border-color)",
      background: "var(--bg-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxShadow: "var(--shadow-sm)"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <h1 style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "var(--text-primary)",
          margin: 0
        }}>
          Ababil Studio
        </h1>
      </div>
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <button className="btn btn-icon" title="Settings">
          <Settings size={20} />
        </button>
        <button className="btn btn-icon" title="Environment">
          <Globe size={20} />
        </button>
      </div>
    </header>
  );
};
