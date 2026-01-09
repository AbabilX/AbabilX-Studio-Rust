import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { RequestEditor } from "../../features/request-builder/RequestEditor";
import { ResponsePanel } from "../../features/response-viewer/ResponsePanel";
import { HttpResponse } from "../../services/tauri/http.service";

export const MainLayout: React.FC = () => {
  const [response, setResponse] = useState<HttpResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResponse = (resp: HttpResponse) => {
    setResponse(resp);
    setIsLoading(false);
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <div className="panel panel-bordered">
            <RequestEditor onResponse={handleResponse} />
          </div>
          <div className="panel">
            <ResponsePanel response={response} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
