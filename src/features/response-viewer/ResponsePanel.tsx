import React, { useState } from "react";
import { FileText, Cookie, Send } from "lucide-react";
import { StatusBar } from "./StatusBar";

type ResponseTab = "body" | "headers" | "cookies";

export const ResponsePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ResponseTab>("body");
  const [response] = useState<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: unknown;
  } | null>(null);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--bg-primary)"
    }}>
      {/* Status Bar */}
      <StatusBar />

      {/* Tabs */}
      <div className="tabs" style={{ padding: "0 16px" }}>
        <button
          className={`tab ${activeTab === "body" ? "active" : ""}`}
          onClick={() => setActiveTab("body")}
        >
          <FileText size={16} style={{ marginRight: "6px" }} />
          Body
        </button>
        <button
          className={`tab ${activeTab === "headers" ? "active" : ""}`}
          onClick={() => setActiveTab("headers")}
        >
          <FileText size={16} style={{ marginRight: "6px" }} />
          Headers
        </button>
        <button
          className={`tab ${activeTab === "cookies" ? "active" : ""}`}
          onClick={() => setActiveTab("cookies")}
        >
          <Cookie size={16} style={{ marginRight: "6px" }} />
          Cookies
        </button>
      </div>

      {/* Response Content */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "16px",
        background: "var(--bg-secondary)"
      }}>
        {!response ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "var(--text-secondary)"
          }}>
            <Send size={64} style={{ opacity: 0.3, marginBottom: "16px" }} />
            <p style={{ fontSize: "14px" }}>Send a request to see the response</p>
          </div>
        ) : (
          <div>
            {activeTab === "body" && (
              <pre style={{
                background: "var(--bg-primary)",
                padding: "16px",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border-color)",
                fontSize: "13px",
                fontFamily: "monospace",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
              }}>
                {JSON.stringify(response.data, null, 2)}
              </pre>
            )}
            {activeTab === "headers" && (
              <div className="card">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} style={{
                    padding: "8px 0",
                    borderBottom: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>{key}:</span>
                    <span style={{ color: "var(--text-secondary)" }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "cookies" && (
              <div style={{ color: "var(--text-secondary)" }}>
                <p>Cookies will be displayed here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
