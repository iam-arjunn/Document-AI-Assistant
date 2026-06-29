import { ChevronDown } from "lucide-react";
import type { Source } from "../../types";

type Props = {
  source: Source;
  compact?: boolean;
};

export function SourceCard({ source, compact = false }: Props) {
  return (
    <details className={`source-card ${compact ? "compact" : ""}`}>
      <summary>
        <div>
          <strong>{source.documentName}</strong>
          <span>
            Page {source.page} · {source.section}
          </span>
        </div>
        <em>{Math.round(source.score * 100)}%</em>
        <ChevronDown size={16} />
      </summary>
      <p>{source.preview}</p>
      {!compact && (
        <dl>
          {Object.entries(source.metadata).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </details>
  );
}
