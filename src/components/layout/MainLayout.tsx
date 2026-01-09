import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { RequestEditor } from "../../features/request-builder/RequestEditor";
import { ResponsePanel } from "../../features/response-viewer/ResponsePanel";

export const MainLayout: React.FC = () => {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden"
    }}>
      <Sidebar />
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        <Header />
        <div style={{
          flex: 1,
          display: "flex",
          overflow: "hidden"
        }}>
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid var(--border-color)",
            overflow: "hidden"
          }}>
            <RequestEditor />
          </div>
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}>
            <ResponsePanel />
          </div>
        </div>
      </div>
    </div>
  );
};
