export type ProcessingStatus =
  | "Uploading"
  | "Extracting Text"
  | "Creating Chunks"
  | "Generating Embeddings"
  | "Indexing"
  | "Ready";

export type UploadedDocument = {
  id: string;
  name: string;
  type: "PDF" | "DOCX" | "TXT";
  size: string;
  pages: number;
  chunks: number;
  uploadedAt: string;
  status: ProcessingStatus;
};

export type Source = {
  id: string;
  documentName: string;
  page: number;
  section: string;
  score: number;
  preview: string;
  metadata: Record<string, string>;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  sources?: Source[];
};

export type Stat = {
  label: string;
  value: string;
  detail: string;
};
