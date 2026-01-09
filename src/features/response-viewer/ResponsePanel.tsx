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
    <div className="flex flex-col" style={{ height: "100%" }}>
      {/* Status Bar */}
      <StatusBar />

      {/* Tabs */}
      <div className="response-tabs">
        <button
          className={`response-tab ${activeTab === "body" ? "active" : ""}`}
          onClick={() => setActiveTab("body")}>
          <FileText size={14} />
          Body
        </button>
        <button
          className={`response-tab ${activeTab === "headers" ? "active" : ""}`}
          onClick={() => setActiveTab("headers")}>
          <FileText size={14} />
          Headers
        </button>
        <button
          className={`response-tab ${activeTab === "cookies" ? "active" : ""}`}
          onClick={() => setActiveTab("cookies")}>
          <Cookie size={14} />
          Cookies
        </button>
      </div>

      {/* Response Content */}
      <div className="response-content">
        {!response ? (
          <div className="response-empty">
            <Send size={48} className="response-empty-icon" />
            <p className="response-empty-text">
              Send a request to see the response
            </p>
          </div>
        ) : (
          <div>
            {activeTab === "body" && (
              <pre className="response-body">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            )}
            {activeTab === "headers" && (
              <div className="headers-table">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="headers-row">
                    <span className="headers-key">{key}</span>
                    <span className="headers-value">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "cookies" && (
              <div className="text-secondary text-subheadline">
                <p>Cookies will be displayed here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
