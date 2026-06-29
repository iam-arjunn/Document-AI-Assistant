import { File, Info, MoreVertical, Trash2 } from "lucide-react";
import type { UploadedDocument } from "../../types";

type Props = {
  document: UploadedDocument;
};

export function DocumentCard({ document }: Props) {
  const isReady = document.status === "Ready";

  return (
    <article className="document-card">
      <div className="document-card-top">
        <div className={`file-badge ${document.type.toLowerCase()}`}>
          <File size={17} />
          {document.type}
        </div>
        <div className="document-actions">
          <button aria-label="View metadata">
            <Info size={15} />
          </button>
          <button aria-label="Delete document">
            <Trash2 size={15} />
          </button>
          <button aria-label="More actions">
            <MoreVertical size={15} />
          </button>
        </div>
      </div>
      <h3>{document.name}</h3>
      <div className="document-meta">
        <span>{document.size}</span>
        <span>{document.pages} pages</span>
        <span>{document.chunks} chunks</span>
      </div>
      <div className="document-footer">
        <span>{document.uploadedAt}</span>
        <strong className={isReady ? "ready" : "processing"}>{document.status}</strong>
      </div>
    </article>
  );
}
