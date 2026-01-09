import React, { useState } from "react";
import { Send, Link, FileText, Code, Lock } from "lucide-react";
import { HeadersTab } from "./HeadersTab";
import { BodyTab } from "./BodyTab";

const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

export const RequestEditor: React.FC = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState<
    "params" | "headers" | "body" | "auth"
  >("headers");

  const getMethodClass = () => {
    return `method-select ${method.toLowerCase()}`;
  };

  return (
    <div className="flex flex-col" style={{ height: "100%" }}>
      {/* Request URL Bar */}
      <div className="url-bar">
        {/* Method Selector */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className={getMethodClass()}>
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
          className="url-input"
        />

        {/* Send Button */}
        <button className="send-btn">
          <Send size={16} />
          Send
        </button>
      </div>

      {/* Tabs */}
      <div className="request-tabs">
        <button
          className={`request-tab ${activeTab === "params" ? "active" : ""}`}
          onClick={() => setActiveTab("params")}>
          <Link size={14} />
          Params
        </button>
        <button
          className={`request-tab ${activeTab === "headers" ? "active" : ""}`}
          onClick={() => setActiveTab("headers")}>
          <FileText size={14} />
          Headers
        </button>
        <button
          className={`request-tab ${activeTab === "body" ? "active" : ""}`}
          onClick={() => setActiveTab("body")}>
          <Code size={14} />
          Body
        </button>
        <button
          className={`request-tab ${activeTab === "auth" ? "active" : ""}`}
          onClick={() => setActiveTab("auth")}>
          <Lock size={14} />
          Auth
        </button>
      </div>

      {/* Tab Content */}
      <div className="request-content">
        {activeTab === "params" && (
          <div className="text-secondary text-subheadline">
            <p>Query parameters will be added here</p>
          </div>
        )}
        {activeTab === "headers" && <HeadersTab />}
        {activeTab === "body" && <BodyTab />}
        {activeTab === "auth" && (
          <div className="text-secondary text-subheadline">
            <p>Authentication settings will be added here</p>
          </div>
        )}
      </div>
    </div>
  );
};
