import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export function SettingsModal({ onClose }: Props) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Workspace</p>
            <h2 id="settings-title">Settings</h2>
          </div>
          <button className="icon-button" aria-label="Close settings" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="settings-grid">
          <label>
            Theme
            <select defaultValue="light">
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </label>
          <label>
            Embedding Model
            <select defaultValue="nomic-embed">
              <option value="nomic-embed">nomic-embed-text</option>
              <option value="bge-small">bge-small-en</option>
            </select>
          </label>
          <label>
            LLM Model
            <select defaultValue="llama">
              <option value="llama">llama3.1</option>
              <option value="mistral">mistral</option>
            </select>
          </label>
          <label>
            Temperature
            <input type="range" min="0" max="1" step="0.1" defaultValue="0.2" />
          </label>
          <label>
            Maximum Retrieved Chunks
            <input type="number" defaultValue={8} min={1} max={20} />
          </label>
          <label>
            Chunk Size
            <input type="number" defaultValue={900} min={200} max={2000} />
          </label>
          <label>
            Chunk Overlap
            <input type="number" defaultValue={120} min={0} max={500} />
          </label>
          <div className="system-status">
            <span>Vector Database Status</span>
            <strong>Online</strong>
          </div>
          <div className="system-status">
            <span>Ollama Status</span>
            <strong>Connected</strong>
          </div>
          <div className="system-status">
            <span>Application Version</span>
            <strong>0.1.0</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
