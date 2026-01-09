import React from "react";
import { Clock, Copy, Save } from "lucide-react";

export const StatusBar: React.FC = () => {
  const status = null; // Will come from response
  const responseTime = null;

  const getStatusClass = (status?: number): string => {
    if (!status) return "";
    if (status >= 200 && status < 300) return "success";
    if (status >= 300 && status < 400) return "redirect";
    if (status >= 400 && status < 500) return "client-error";
    if (status >= 500) return "server-error";
    return "";
  };

  return (
    <div className="status-bar">
      <div className="status-indicator">
        <span className="text-caption1">Status:</span>
        {status ? (
          <span className={`status-code ${getStatusClass(status)}`}>
            {status}
          </span>
        ) : (
          <span className="text-tertiary">—</span>
        )}
      </div>

      <div className="response-meta">
        {responseTime && (
          <>
            <Clock size={14} className="text-tertiary" />
            <span className="response-meta-item">
              <span className="response-meta-value">{responseTime}</span>ms
            </span>
          </>
        )}
        <button className="btn btn-icon btn-sm" title="Copy response">
          <Copy size={14} />
        </button>
        <button className="btn btn-icon btn-sm" title="Save response">
          <Save size={14} />
        </button>
      </div>
    </div>
  );
};
