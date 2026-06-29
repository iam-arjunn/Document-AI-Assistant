import { FileSearch, Layers, ScanSearch } from "lucide-react";
import type { Source } from "../../types";
import { SourceCard } from "./SourceCard";

type Props = {
  sources: Source[];
};

export function ContextPanel({ sources }: Props) {
  return (
    <div className="context-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Retrieval</p>
          <h2>Sources</h2>
        </div>
        <span className="score-badge">Top {sources.length}</span>
      </div>

      <div className="retrieval-summary">
        <div>
          <ScanSearch size={18} />
          <span>Hybrid search</span>
          <strong>0.92 max score</strong>
        </div>
        <div>
          <Layers size={18} />
          <span>Retrieved chunks</span>
          <strong>8 selected</strong>
        </div>
        <div>
          <FileSearch size={18} />
          <span>Documents matched</span>
          <strong>2 files</strong>
        </div>
      </div>

      <div className="source-list">
        {sources.map((source) => (
          <SourceCard key={source.id} source={source} />
        ))}
      </div>

      <section className="document-preview">
        <p className="eyebrow">Preview</p>
        <h3>Engineering Handbook.pdf</h3>
        <div className="preview-page">
          <span>Page 12</span>
          <p>
            Dependency Injection keeps modules testable by receiving collaborators through constructors or
            configuration instead of constructing them internally.
          </p>
        </div>
      </section>
    </div>
  );
}
