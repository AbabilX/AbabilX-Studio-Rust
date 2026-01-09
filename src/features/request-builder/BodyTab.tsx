import React from "react";
import { FileText } from "lucide-react";

type BodyType = "none" | "raw";

interface Props {
  bodyType: BodyType;
  rawBody: string;
  onBodyTypeChange: (type: BodyType) => void;
  onRawBodyChange: (body: string) => void;
}

export const BodyTab: React.FC<Props> = ({
  bodyType,
  rawBody,
  onBodyTypeChange,
  onRawBodyChange,
}) => {
  return (
    <div>
      <div className="section-header">
        <div className="body-type-selector">
          <button
            className={`body-type-btn ${bodyType === "none" ? "active" : ""}`}
            onClick={() => onBodyTypeChange("none")}>
            None
          </button>
          <button
            className={`body-type-btn ${bodyType === "raw" ? "active" : ""}`}
            onClick={() => onBodyTypeChange("raw")}>
            Raw
          </button>
        </div>
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
          onChange={(e) => onRawBodyChange(e.target.value)}
          placeholder="Enter request body..."
          className="code-editor"
          style={{ minHeight: "200px" }}
        />
      )}
    </div>
  );
};
