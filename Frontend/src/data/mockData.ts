import type { ChatMessage, Source, Stat, UploadedDocument } from "../types";

export const documents: UploadedDocument[] = [
  {
    id: "doc-1",
    name: "Engineering Handbook.pdf",
    type: "PDF",
    size: "2.4 MB",
    pages: 42,
    chunks: 186,
    uploadedAt: "Today, 10:24 AM",
    status: "Ready",
  },
  {
    id: "doc-2",
    name: "Product Requirements Q3.docx",
    type: "DOCX",
    size: "894 KB",
    pages: 18,
    chunks: 74,
    uploadedAt: "Yesterday, 4:10 PM",
    status: "Ready",
  },
  {
    id: "doc-3",
    name: "Research Notes.txt",
    type: "TXT",
    size: "128 KB",
    pages: 7,
    chunks: 29,
    uploadedAt: "Jun 27, 2:35 PM",
    status: "Generating Embeddings",
  },
];

export const sources: Source[] = [
  {
    id: "src-1",
    documentName: "Engineering Handbook.pdf",
    page: 12,
    section: "Architecture Patterns",
    score: 0.92,
    preview:
      "Dependency Injection keeps construction separate from behavior, making services easier to test and swap.",
    metadata: {
      author: "Platform Team",
      chunk: "42",
      parser: "PDF text layer",
    },
  },
  {
    id: "src-2",
    documentName: "Product Requirements Q3.docx",
    page: 5,
    section: "Service Reliability",
    score: 0.87,
    preview:
      "Modules should expose clear interfaces and avoid hidden dependencies that complicate operational debugging.",
    metadata: {
      owner: "Product Ops",
      chunk: "18",
      parser: "DOCX extractor",
    },
  },
  {
    id: "src-3",
    documentName: "Engineering Handbook.pdf",
    page: 14,
    section: "Testing Strategy",
    score: 0.81,
    preview:
      "Injectable collaborators allow unit tests to replace external systems with deterministic doubles.",
    metadata: {
      author: "Platform Team",
      chunk: "47",
      parser: "PDF text layer",
    },
  },
];

export const messages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    content: "What is Dependency Injection and why is it useful?",
  },
  {
    id: "msg-2",
    role: "assistant",
    content:
      "Dependency Injection is a design technique where a component receives the services it needs from the outside instead of creating them internally.\n\nIn the uploaded material, it is framed as a way to keep construction separate from behavior. That helps teams test code with deterministic substitutes, change implementations with less risk, and make dependencies visible at module boundaries.",
    confidence: 0.91,
    sources,
  },
];

export const stats: Stat[] = [
  { label: "Uploaded Documents", value: "3", detail: "2 ready, 1 processing" },
  { label: "Indexed Chunks", value: "289", detail: "Vector store online" },
  { label: "Embedding Model", value: "nomic-embed", detail: "768 dimensions" },
  { label: "Active LLM", value: "llama3.1", detail: "Ollama connected" },
  { label: "Questions Asked", value: "128", detail: "This workspace" },
  { label: "Avg Response", value: "2.1s", detail: "Last 24 hours" },
];

export const uploadSteps = [
  "Uploading",
  "Extracting Text",
  "Creating Chunks",
  "Generating Embeddings",
  "Indexing",
  "Ready",
] as const;
