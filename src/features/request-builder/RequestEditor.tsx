import React, { useState } from "react";
import { Send, Link, FileText, Code, Lock, Loader } from "lucide-react";
import { HeadersTab } from "./HeadersTab";
import { BodyTab } from "./BodyTab";
import {
  httpService,
  HttpResponse,
  RequestHeader,
} from "../../services/tauri/http.service";

const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

// Shared state type for parent component integration
export interface RequestState {
  method: string;
  url: string;
  headers: { id: string; key: string; value: string; enabled: boolean }[];
  bodyType: string;
  rawBody: string;
}

interface Props {
  onResponse?: (response: HttpResponse) => void;
}

export const RequestEditor: React.FC<Props> = ({ onResponse }) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState<
    "params" | "headers" | "body" | "auth"
  >("headers");
  const [isLoading, setIsLoading] = useState(false);
  const [headers, setHeaders] = useState<
    { id: string; key: string; value: string; enabled: boolean }[]
  >([{ id: "1", key: "", value: "", enabled: true }]);
  const [bodyType, setBodyType] = useState<"none" | "raw">("none");
  const [rawBody, setRawBody] = useState("");

  const getMethodClass = () => {
    return `method-select ${method.toLowerCase()}`;
  };

  const handleSend = async () => {
    if (!url.trim()) return;

    setIsLoading(true);

    try {
      // Build headers from state
      const requestHeaders: RequestHeader[] = headers
        .filter((h) => h.enabled && h.key.trim())
        .map((h) => ({ key: h.key, value: h.value }));

      // Build request object
      const request = {
        method,
        url: { raw: url },
        header: requestHeaders.length > 0 ? requestHeaders : undefined,
        body:
          bodyType === "raw" && rawBody.trim()
            ? { mode: "raw" as const, raw: rawBody }
            : undefined,
      };

      // Call Rust backend
      const response = await httpService.makeRequest(request);

      // Notify parent component if callback provided
      if (onResponse) {
        onResponse(response);
      }

      console.log("Response:", response);
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setIsLoading(false);
    }
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
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Send Button */}
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={isLoading || !url.trim()}>
          {isLoading ? (
            <Loader size={16} className="spinner" />
          ) : (
            <Send size={16} />
          )}
          {isLoading ? "Sending..." : "Send"}
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
        {activeTab === "headers" && (
          <HeadersTab headers={headers} onHeadersChange={setHeaders} />
        )}
        {activeTab === "body" && (
          <BodyTab
            bodyType={bodyType}
            rawBody={rawBody}
            onBodyTypeChange={setBodyType}
            onRawBodyChange={setRawBody}
          />
        )}
        {activeTab === "auth" && (
          <div className="text-secondary text-subheadline">
            <p>Authentication settings will be added here</p>
          </div>
        )}
      </div>
    </div>
  );
};
