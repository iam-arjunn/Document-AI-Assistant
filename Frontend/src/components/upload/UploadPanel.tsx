import { CloudUpload } from "lucide-react";
import { uploadSteps } from "../../data/mockData";

export function UploadPanel() {
  return (
    <section className="upload-panel">
      <div className="drop-zone">
        <CloudUpload size={24} />
        <strong>Drop documents here</strong>
        <span>PDF, DOCX, TXT up to 25 MB</span>
      </div>
      <div className="timeline">
        {uploadSteps.map((step, index) => (
          <div className={`timeline-step ${index < 4 ? "complete" : index === 4 ? "active" : ""}`} key={step}>
            <span />
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
