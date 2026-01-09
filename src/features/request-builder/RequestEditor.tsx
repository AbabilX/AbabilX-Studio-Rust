import React, { useState } from "react";
import { Send, Link, FileText, Code, Lock } from "lucide-react";
import { HeadersTab } from "./HeadersTab";
import { BodyTab } from "./BodyTab";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

export const RequestEditor: React.FC = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState<"params" | "headers" | "body" | "auth">("headers");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--bg-primary)"
    }}>
      {/* Request URL Bar */}
      <div style={{
        padding: "16px",
        borderBottom: "1px solid var(--border-color)",
        background: "var(--bg-secondary)"
      }}>
        <div style={{
          display: "flex",
          gap: "8px",
          alignItems: "center"
        }}>
          {/* Method Selector */}
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              minWidth: "100px"
            }}
          >
            {HTTP_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* URL Input */}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL"
            className="input"
            style={{
              flex: 1
            }}
          />

          {/* Send Button */}
          <button className="btn btn-primary">
            <Send size={18} />
            Send
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ padding: "0 16px" }}>
        <button
          className={`tab ${activeTab === "params" ? "active" : ""}`}
          onClick={() => setActiveTab("params")}
        >
          <Link size={16} style={{ marginRight: "6px" }} />
          Params
        </button>
        <button
          className={`tab ${activeTab === "headers" ? "active" : ""}`}
          onClick={() => setActiveTab("headers")}
        >
          <FileText size={16} style={{ marginRight: "6px" }} />
          Headers
        </button>
        <button
          className={`tab ${activeTab === "body" ? "active" : ""}`}
          onClick={() => setActiveTab("body")}
        >
          <Code size={16} style={{ marginRight: "6px" }} />
          Body
        </button>
        <button
          className={`tab ${activeTab === "auth" ? "active" : ""}`}
          onClick={() => setActiveTab("auth")}
        >
          <Lock size={16} style={{ marginRight: "6px" }} />
          Auth
        </button>
      </div>

      {/* Tab Content */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "16px"
      }}>
        {activeTab === "params" && (
          <div style={{ color: "var(--text-secondary)" }}>
            <p>Query parameters will be added here</p>
          </div>
        )}
        {activeTab === "headers" && <HeadersTab />}
        {activeTab === "body" && <BodyTab />}
        {activeTab === "auth" && (
          <div style={{ color: "var(--text-secondary)" }}>
            <p>Authentication settings will be added here</p>
          </div>
        )}
      </div>
    </div>
  );
};
