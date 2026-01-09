import React, { useState } from "react";
import { FileText } from "lucide-react";

type BodyType = "none" | "raw" | "form-data" | "x-www-form-urlencoded";

export const BodyTab: React.FC = () => {
  const [bodyType, setBodyType] = useState<BodyType>("raw");
  const [rawBody, setRawBody] = useState("");
  const [contentType, setContentType] = useState("application/json");

  return (
    <div>
      <div className="section-header">
        <div className="body-type-selector">
          <button
            className={`body-type-btn ${bodyType === "none" ? "active" : ""}`}
            onClick={() => setBodyType("none")}>
            None
          </button>
          <button
            className={`body-type-btn ${bodyType === "raw" ? "active" : ""}`}
            onClick={() => setBodyType("raw")}>
            Raw
          </button>
          <button
            className={`body-type-btn ${
              bodyType === "form-data" ? "active" : ""
            }`}
            onClick={() => setBodyType("form-data")}>
            Form Data
          </button>
          <button
            className={`body-type-btn ${
              bodyType === "x-www-form-urlencoded" ? "active" : ""
            }`}
            onClick={() => setBodyType("x-www-form-urlencoded")}>
            URL Encoded
          </button>
        </div>
        {bodyType === "raw" && (
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="select select-sm"
            style={{ width: "auto", minWidth: "120px" }}>
            <option value="application/json">JSON</option>
            <option value="text/plain">Text</option>
            <option value="application/xml">XML</option>
            <option value="text/html">HTML</option>
          </select>
        )}
      </div>

      {bodyType === "none" && (
        <div className="card-empty">
          <FileText size={40} className="card-empty-icon" />
          <p className="card-empty-title">No body data</p>
        </div>
      )}

      {bodyType === "raw" && (
        <textarea
          value={rawBody}
          onChange={(e) => setRawBody(e.target.value)}
          placeholder={`Enter ${contentType} body...`}
          className="code-editor"
          style={{ minHeight: "200px" }}
        />
      )}

      {(bodyType === "form-data" || bodyType === "x-www-form-urlencoded") && (
        <div className="text-secondary text-subheadline">
          <p>Form data editor will be implemented here</p>
        </div>
      )}
    </div>
  );
};
