import React, { useState } from "react";
import { Folder, FolderOpen, FileText, ChevronDown, ChevronRight } from "lucide-react";

interface CollectionItem {
  id: string;
  name: string;
  type: "collection" | "folder" | "request";
  children?: CollectionItem[];
}

export const CollectionTree: React.FC = () => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [items] = useState<CollectionItem[]>([
    {
      id: "1",
      name: "My Collection",
      type: "collection",
      children: [
        {
          id: "2",
          name: "API Endpoints",
          type: "folder",
          children: [
            { id: "3", name: "Get Users", type: "request" },
            { id: "4", name: "Create User", type: "request" }
          ]
        }
      ]
    }
  ]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "collection":
        return Folder;
      case "folder":
        return FolderOpen;
      case "request":
        return FileText;
      default:
        return FileText;
    }
  };

  const renderItem = (item: CollectionItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded.has(item.id);

    return (
      <div key={item.id}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 8px",
            paddingLeft: `${8 + level * 16}px`,
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            transition: "background 0.2s",
            color: "var(--text-primary)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
          onClick={() => hasChildren && toggleExpand(item.id)}
        >
          {hasChildren && (
            <>
              {isExpanded ? (
                <ChevronDown size={14} style={{ color: "var(--text-secondary)" }} />
              ) : (
                <ChevronRight size={14} style={{ color: "var(--text-secondary)" }} />
              )}
            </>
          )}
          {!hasChildren && <div style={{ width: "14px" }} />}
          {React.createElement(getIcon(item.type), {
            size: 16,
            style: { color: "var(--text-secondary)" }
          })}
          <span style={{
            fontSize: "13px",
            flex: 1
          }}>
            {item.name}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {items.length === 0 ? (
        <div style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "var(--text-secondary)"
        }}>
          <Folder size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
          <p style={{ fontSize: "13px", margin: 0 }}>No collections yet</p>
          <p style={{ fontSize: "12px", margin: "4px 0 0 0", opacity: 0.7 }}>
            Create a new collection to get started
          </p>
        </div>
      ) : (
        <div>
          {items.map((item) => renderItem(item))}
        </div>
      )}
    </div>
  );
};
