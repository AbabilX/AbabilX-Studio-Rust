import React from "react";
import { Clock, Copy, Save } from "lucide-react";

export const StatusBar: React.FC = () => {
  const status = null; // Will come from response
  const responseTime = null;

  const getStatusColor = (status?: number) => {
    if (!status) return "var(--text-secondary)";
    if (status >= 200 && status < 300) return "var(--success)";
    if (status >= 300 && status < 400) return "var(--info)";
    if (status >= 400 && status < 500) return "var(--warning)";
    if (status >= 500) return "var(--danger)";
    return "var(--text-secondary)";
  };

  return (
    <div style={{
      padding: "12px 16px",
      borderBottom: "1px solid var(--border-color)",
      background: "var(--bg-secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <span style={{
          fontSize: "12px",
          color: "var(--text-secondary)",
          fontWeight: "500"
        }}>
          Status:
        </span>
        {status ? (
          <span style={{
            padding: "4px 8px",
            borderRadius: "var(--radius-sm)",
            fontSize: "12px",
            fontWeight: "600",
            color: getStatusColor(status),
            background: "rgba(0, 0, 0, 0.05)"
          }}>
            {status}
          </span>
        ) : (
          <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}>—</span>
        )}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        {responseTime && (
          <>
            <Clock size={16} style={{ color: "var(--text-secondary)" }} />
            <span style={{
              fontSize: "12px",
              color: "var(--text-secondary)"
            }}>
              {responseTime}ms
            </span>
          </>
        )}
        <button className="btn btn-icon btn-sm" title="Copy response">
          <Copy size={16} />
        </button>
        <button className="btn btn-icon btn-sm" title="Save response">
          <Save size={16} />
        </button>
      </div>
    </div>
  );
};
