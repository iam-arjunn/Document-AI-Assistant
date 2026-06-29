import { Mic, Paperclip, Send, Sparkles } from "lucide-react";
import { useState } from "react";

type Props = {
  onOpenContext: () => void;
};

const suggestions = [
  "What is Dependency Injection?",
  "Summarize this document",
  "Compare Chapter 2 and Chapter 5",
  "What are the action items?",
];

export function PromptComposer({ onOpenContext }: Props) {
  const [value, setValue] = useState("");

  return (
    <footer className="prompt-area">
      <div className="suggestions">
        {suggestions.map((suggestion) => (
          <button key={suggestion} onClick={() => setValue(suggestion)}>
            <Sparkles size={14} />
            {suggestion}
          </button>
        ))}
      </div>
      <div className="composer">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ask a question about your indexed documents..."
          rows={3}
          maxLength={2000}
        />
        <div className="composer-actions">
          <div>
            <button aria-label="Attach document">
              <Paperclip size={18} />
            </button>
            <button aria-label="Voice input" disabled>
              <Mic size={18} />
            </button>
            <button className="context-button" onClick={onOpenContext}>
              Sources
            </button>
          </div>
          <span>{value.length}/2000</span>
          <button className="send-button" aria-label="Send message">
            <Send size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
