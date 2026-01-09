import React from "react";
import { Settings, Globe } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Ababil Studio</h1>
      </div>

      <div className="header-right">
        <button className="btn btn-icon" title="Environment">
          <Globe size={18} />
        </button>
        <button className="btn btn-icon" title="Settings">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
