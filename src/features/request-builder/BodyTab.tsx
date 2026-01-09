import React, { useState } from "react";
import { FileText } from "lucide-react";

type BodyType = "none" | "raw" | "form-data" | "x-www-form-urlencoded";

export const BodyTab: React.FC = () => {
  const [bodyType, setBodyType] = useState<BodyType>("raw");
  const [rawBody, setRawBody] = useState("");
  const [contentType, setContentType] = useState("application/json");

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
      }}>
        <div style={{
          display: "flex",
          gap: "8px"
        }}>
          <button
            className={`btn btn-sm ${bodyType === "none" ? "btn-primary" : ""}`}
            onClick={() => setBodyType("none")}
          >
            None
          </button>
          <button
            className={`btn btn-sm ${bodyType === "raw" ? "btn-primary" : ""}`}
            onClick={() => setBodyType("raw")}
          >
            Raw
          </button>
          <button
            className={`btn btn-sm ${bodyType === "form-data" ? "btn-primary" : ""}`}
            onClick={() => setBodyType("form-data")}
          >
            Form Data
          </button>
          <button
            className={`btn btn-sm ${bodyType === "x-www-form-urlencoded" ? "btn-primary" : ""}`}
            onClick={() => setBodyType("x-www-form-urlencoded")}
          >
            x-www-form-urlencoded
          </button>
        </div>
        {bodyType === "raw" && (
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="input input-sm"
            style={{ width: "auto", minWidth: "150px" }}
          >
            <option value="application/json">JSON</option>
            <option value="text/plain">Text</option>
            <option value="application/xml">XML</option>
            <option value="text/html">HTML</option>
          </select>
        )}
      </div>

      {bodyType === "none" && (
        <div style={{
          padding: "40px",
          textAlign: "center",
          color: "var(--text-secondary)"
        }}>
          <FileText size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
          <p>No body data</p>
        </div>
      )}

      {bodyType === "raw" && (
        <textarea
          value={rawBody}
          onChange={(e) => setRawBody(e.target.value)}
          placeholder={`Enter ${contentType} body...`}
          style={{
            width: "100%",
            minHeight: "300px",
            padding: "12px",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius)",
            fontFamily: "monospace",
            fontSize: "13px",
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            resize: "vertical"
          }}
        />
      )}

      {(bodyType === "form-data" || bodyType === "x-www-form-urlencoded") && (
        <div style={{ color: "var(--text-secondary)" }}>
          <p>Form data editor will be implemented here</p>
        </div>
      )}
    </div>
  );
};
