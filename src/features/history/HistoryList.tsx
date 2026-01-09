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
      status: 200,
    },
    {
      id: "2",
      method: "POST",
      url: "https://api.example.com/users",
      timestamp: new Date(Date.now() - 3600000),
      status: 201,
    },
  ]);

  const getStatusBadgeClass = (status?: number): string => {
    if (!status) return "";
    if (status >= 200 && status < 300) return "badge-success";
    if (status >= 400) return "badge-danger";
    return "badge-warning";
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
    <div className="collection-tree">
      {history.length === 0 ? (
        <div className="collection-empty">
          <Clock size={40} className="collection-empty-icon" />
          <p className="collection-empty-title">No request history</p>
          <p className="collection-empty-description">
            Your request history will appear here
          </p>
        </div>
      ) : (
        <div className="card">
          {history.map((item) => (
            <div key={item.id} className="card-list-item">
              <div className="card-list-item-content">
                <div
                  className="flex items-center gap-2"
                  style={{ marginBottom: "4px" }}>
                  <span
                    className={`tree-item-method ${item.method.toLowerCase()}`}>
                    {item.method}
                  </span>
                  {item.status && (
                    <span
                      className={`badge ${getStatusBadgeClass(item.status)}`}>
                      {item.status}
                    </span>
                  )}
                  <span
                    className="text-caption1"
                    style={{ marginLeft: "auto" }}>
                    {formatTime(item.timestamp)}
                  </span>
                </div>
                <div className="text-subheadline text-truncate">{item.url}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
