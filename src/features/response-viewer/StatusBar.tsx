import React from "react";
import { Clock, Copy, Save } from "lucide-react";
import { HttpResponse } from "../../services/tauri/http.service";

interface Props {
  response: HttpResponse | null;
}

export const StatusBar: React.FC<Props> = ({ response }) => {
  const getStatusClass = (statusCode?: number): string => {
    if (!statusCode) return "";
    if (statusCode >= 200 && statusCode < 300) return "success";
    if (statusCode >= 300 && statusCode < 400) return "redirect";
    if (statusCode >= 400 && statusCode < 500) return "client-error";
    if (statusCode >= 500) return "server-error";
    return "";
  };

  const copyResponse = () => {
    if (response?.body) {
      navigator.clipboard.writeText(response.body);
    }
  };

  return (
    <div className="status-bar">
      <div className="status-indicator">
        <span className="text-caption1">Status:</span>
        {response?.statusCode ? (
          <span
            className={`status-code ${getStatusClass(response.statusCode)}`}>
            {response.statusCode}
          </span>
        ) : (
          <span className="text-tertiary">—</span>
        )}
      </div>

      <div className="response-meta">
        {response?.durationMs !== undefined && response.durationMs > 0 && (
          <>
            <Clock size={14} className="text-tertiary" />
            <span className="response-meta-item">
              <span className="response-meta-value">{response.durationMs}</span>
              ms
            </span>
          </>
        )}
        <button
          className="btn btn-icon btn-sm"
          title="Copy response"
          onClick={copyResponse}
          disabled={!response?.body}>
          <Copy size={14} />
        </button>
        <button className="btn btn-icon btn-sm" title="Save response">
          <Save size={14} />
        </button>
      </div>
    </div>
  );
};
