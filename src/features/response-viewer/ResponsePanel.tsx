import React, { useState } from "react";
import { FileText, Cookie, Send, Loader } from "lucide-react";
import { StatusBar } from "./StatusBar";
import { HttpResponse } from "../../services/tauri/http.service";

type ResponseTab = "body" | "headers" | "cookies";

interface Props {
  response: HttpResponse | null;
  isLoading?: boolean;
}

export const ResponsePanel: React.FC<Props> = ({ response, isLoading }) => {
  const [activeTab, setActiveTab] = useState<ResponseTab>("body");

  const formatBody = (body: string) => {
    try {
      const parsed = JSON.parse(body);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return body;
    }
  };

  return (
    <div className="flex flex-col" style={{ height: "100%" }}>
      {/* Status Bar */}
      <StatusBar response={response} />

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
        {isLoading ? (
          <div className="response-loading">
            <div className="spinner" />
          </div>
        ) : !response ? (
          <div className="response-empty">
            <Send size={48} className="response-empty-icon" />
            <p className="response-empty-text">
              Send a request to see the response
            </p>
          </div>
        ) : response.error ? (
          <div className="response-empty">
            <p className="response-empty-text text-destructive">
              {response.error}
            </p>
          </div>
        ) : (
          <div>
            {activeTab === "body" && (
              <pre className="response-body">{formatBody(response.body)}</pre>
            )}
            {activeTab === "headers" && (
              <div className="headers-table">
                {response.headers.map(([key, value], index) => (
                  <div key={index} className="headers-row">
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
