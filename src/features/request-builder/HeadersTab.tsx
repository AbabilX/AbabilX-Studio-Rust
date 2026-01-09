import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

interface Header {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export const HeadersTab: React.FC = () => {
  const [headers, setHeaders] = useState<Header[]>([
    { id: "1", key: "", value: "", enabled: true }
  ]);

  const addHeader = () => {
    setHeaders([...headers, { id: Date.now().toString(), key: "", value: "", enabled: true }]);
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter((h) => h.id !== id));
  };

  const updateHeader = (id: string, field: keyof Header, value: string | boolean) => {
    setHeaders(
      headers.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
      }}>
        <h3 style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "var(--text-primary)",
          margin: 0
        }}>
          Request Headers
        </h3>
        <button className="btn btn-sm" onClick={addHeader}>
          <PlusCircle size={16} />
          Add Header
        </button>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        {headers.map((header) => (
          <div
            key={header.id}
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center"
            }}
          >
            <input
              type="checkbox"
              checked={header.enabled}
              onChange={(e) => updateHeader(header.id, "enabled", e.target.checked)}
              style={{
                cursor: "pointer"
              }}
            />
            <input
              type="text"
              value={header.key}
              onChange={(e) => updateHeader(header.id, "key", e.target.value)}
              placeholder="Header name"
              className="input input-sm"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              value={header.value}
              onChange={(e) => updateHeader(header.id, "value", e.target.value)}
              placeholder="Header value"
              className="input input-sm"
              style={{ flex: 1 }}
            />
            <button
              className="btn btn-icon btn-sm"
              onClick={() => removeHeader(header.id)}
              style={{
                color: "var(--danger)"
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
