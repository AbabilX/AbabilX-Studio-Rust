import React, { useState } from "react";
import { Folder, FolderOpen, FileText, ChevronRight } from "lucide-react";

interface CollectionItem {
  id: string;
  name: string;
  type: "collection" | "folder" | "request";
  method?: string;
  children?: CollectionItem[];
}

export const CollectionTree: React.FC = () => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
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
            { id: "3", name: "Get Users", type: "request", method: "GET" },
            { id: "4", name: "Create User", type: "request", method: "POST" },
          ],
        },
      ],
    },
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

  const getIcon = (item: CollectionItem, isExpanded: boolean) => {
    switch (item.type) {
      case "collection":
        return isExpanded ? FolderOpen : Folder;
      case "folder":
        return isExpanded ? FolderOpen : Folder;
      case "request":
        return FileText;
      default:
        return FileText;
    }
  };

  const renderItem = (item: CollectionItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded.has(item.id);
    const isSelected = selected === item.id;
    const Icon = getIcon(item, isExpanded);

    return (
      <div key={item.id} className="collection-group">
        <div
          className={`tree-item ${isExpanded ? "expanded" : ""} ${
            isSelected ? "selected" : ""
          }`}
          data-level={level}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            }
            setSelected(item.id);
          }}>
          {hasChildren ? (
            <ChevronRight size={14} className="tree-item-chevron" />
          ) : (
            <div className="tree-item-chevron-placeholder" />
          )}

          <Icon
            size={16}
            className={`tree-item-icon ${
              item.type === "folder" || item.type === "collection"
                ? "folder"
                : ""
            }`}
          />

          <span className="tree-item-label">{item.name}</span>

          {item.method && (
            <span className={`tree-item-method ${item.method.toLowerCase()}`}>
              {item.method}
            </span>
          )}
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
    <div className="collection-tree">
      {items.length === 0 ? (
        <div className="collection-empty">
          <Folder size={40} className="collection-empty-icon" />
          <p className="collection-empty-title">No collections yet</p>
          <p className="collection-empty-description">
            Create a new collection to get started
          </p>
        </div>
      ) : (
        <div>{items.map((item) => renderItem(item))}</div>
      )}
    </div>
  );
};
