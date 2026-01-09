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
    { id: "1", key: "", value: "", enabled: true },
  ]);

  const addHeader = () => {
    setHeaders([
      ...headers,
      { id: Date.now().toString(), key: "", value: "", enabled: true },
    ]);
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter((h) => h.id !== id));
  };

  const updateHeader = (
    id: string,
    field: keyof Header,
    value: string | boolean
  ) => {
    setHeaders(
      headers.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Request Headers</h3>
        <button className="btn btn-sm" onClick={addHeader}>
          <PlusCircle size={14} />
          Add Header
        </button>
      </div>

      <div className="kv-editor">
        {headers.map((header) => (
          <div key={header.id} className="kv-row">
            <input
              type="checkbox"
              checked={header.enabled}
              onChange={(e) =>
                updateHeader(header.id, "enabled", e.target.checked)
              }
              className="kv-checkbox"
            />
            <input
              type="text"
              value={header.key}
              onChange={(e) => updateHeader(header.id, "key", e.target.value)}
              placeholder="Header name"
              className="kv-input"
            />
            <input
              type="text"
              value={header.value}
              onChange={(e) => updateHeader(header.id, "value", e.target.value)}
              placeholder="Header value"
              className="kv-input"
            />
            <button
              className="kv-delete"
              onClick={() => removeHeader(header.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
