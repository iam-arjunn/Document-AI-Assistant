import { Filter, RefreshCw, Search, Upload, X } from "lucide-react";
import { documents } from "../../data/mockData";
import { DocumentCard } from "./DocumentCard";
import { UploadPanel } from "../upload/UploadPanel";

type Props = {
  onClose: () => void;
};

export function DocumentSidebar({ onClose }: Props) {
  return (
    <div className="sidebar-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Knowledge Base</p>
          <h2>Documents</h2>
        </div>
        <button className="icon-button mobile-only" aria-label="Close documents" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <button className="primary-button">
        <Upload size={17} />
        Upload Document
      </button>

      <UploadPanel />

      <div className="search-row">
        <label className="search-box">
          <Search size={16} />
          <input placeholder="Search documents" />
        </label>
        <button className="icon-button" aria-label="Filter documents">
          <Filter size={17} />
        </button>
      </div>

      <div className="toolbar-row">
        <span>Supported: PDF, DOCX, TXT</span>
        <button>
          <RefreshCw size={15} />
          Refresh Index
        </button>
      </div>

      <div className="document-list">
        {documents.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
}
