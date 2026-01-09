import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { RequestEditor } from "../../features/request-builder/RequestEditor";
import { ResponsePanel } from "../../features/response-viewer/ResponsePanel";

export const MainLayout: React.FC = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <div className="panel panel-bordered">
            <RequestEditor />
          </div>
          <div className="panel">
            <ResponsePanel />
          </div>
        </div>
      </div>
    </div>
  );
};
