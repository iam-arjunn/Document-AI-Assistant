import { useMemo, useState } from "react";
import { Bell, ChevronRight, Database, FileText, PanelLeftClose, Settings, ShieldCheck, UserCircle } from "lucide-react";
import { ChatWindow } from "./components/chat/ChatWindow";
import { PromptComposer } from "./components/chat/PromptComposer";
import { ContextPanel } from "./components/sources/ContextPanel";
import { DocumentSidebar } from "./components/documents/DocumentSidebar";
import { SettingsModal } from "./components/settings/SettingsModal";
import { StatCard } from "./components/dashboard/StatCard";
import { messages, sources, stats } from "./data/mockData";
import "./styles/app.css";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const readyDocuments = useMemo(() => stats[0].detail.split(",")[0], []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <button className="icon-button mobile-only" aria-label="Open documents" onClick={() => setSidebarOpen(true)}>
            <PanelLeftClose size={18} />
          </button>
          <div className="brand-mark">
            <FileText size={20} />
          </div>
          <div>
            <p className="eyebrow">DIA</p>
            <h1>Document Intelligence Assistant</h1>
          </div>
        </div>
        <div className="header-status">
          <span className="status-pill success">
            <ShieldCheck size={15} />
            Connected
          </span>
          <span className="status-pill">
            <Database size={15} />
            {readyDocuments}
          </span>
          <button className="icon-button" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button className="icon-button" aria-label="Settings" onClick={() => setSettingsOpen(true)}>
            <Settings size={18} />
          </button>
          <button className="profile-button" aria-label="Profile">
            <UserCircle size={24} />
          </button>
        </div>
      </header>

      <div className="workspace">
        <aside className={`left-rail ${sidebarOpen ? "is-open" : ""}`}>
          <DocumentSidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        <main className="main-area">
          <section className="stats-strip" aria-label="Dashboard statistics">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </section>
          <section className="chat-surface">
            <ChatWindow messages={messages} />
            <PromptComposer onOpenContext={() => setContextOpen(true)} />
          </section>
        </main>

        <aside className={`right-rail ${contextOpen ? "is-open" : ""}`}>
          <button className="drawer-close mobile-only" onClick={() => setContextOpen(false)}>
            Retrieval context
            <ChevronRight size={18} />
          </button>
          <ContextPanel sources={sources} />
        </aside>
      </div>

      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}

export default App;
