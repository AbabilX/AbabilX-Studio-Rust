import React, { useState } from "react";
import { Clock } from "lucide-react";

interface HistoryItem {
  id: string;
  method: string;
  url: string;
  timestamp: Date;
  status?: number;
}

export const HistoryList: React.FC = () => {
  const [history] = useState<HistoryItem[]>([
    {
      id: "1",
      method: "GET",
      url: "https://api.example.com/users",
      timestamp: new Date(),
      status: 200
    },
    {
      id: "2",
      method: "POST",
      url: "https://api.example.com/users",
      timestamp: new Date(Date.now() - 3600000),
      status: 201
    }
  ]);

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: "var(--success)",
      POST: "var(--info)",
      PUT: "var(--warning)",
      PATCH: "var(--warning)",
      DELETE: "var(--danger)"
    };
    return colors[method] || "var(--text-secondary)";
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div>
      {history.length === 0 ? (
        <div style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "var(--text-secondary)"
        }}>
          <Clock size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
          <p style={{ fontSize: "13px", margin: 0 }}>No request history</p>
          <p style={{ fontSize: "12px", margin: "4px 0 0 0", opacity: 0.7 }}>
            Your request history will appear here
          </p>
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }}>
          {history.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px 12px",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border-color)",
                cursor: "pointer",
                transition: "all 0.2s",
                background: "var(--bg-secondary)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-tertiary)";
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg-secondary)";
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px"
              }}>
                <span style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: getMethodColor(item.method),
                  padding: "2px 6px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0, 0, 0, 0.05)"
                }}>
                  {item.method}
                </span>
                {item.status && (
                  <span className={`badge badge-${item.status >= 200 && item.status < 300 ? "success" : item.status >= 400 ? "danger" : "warning"}`}>
                    {item.status}
                  </span>
                )}
                <span style={{
                  marginLeft: "auto",
                  fontSize: "11px",
                  color: "var(--text-secondary)"
                }}>
                  {formatTime(item.timestamp)}
                </span>
              </div>
              <div style={{
                fontSize: "12px",
                color: "var(--text-primary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {item.url}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
