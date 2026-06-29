import { Clipboard, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";
import type { ChatMessage } from "../../types";
import { SourceCard } from "../sources/SourceCard";

type Props = {
  message: ChatMessage;
};

export function ChatBubble({ message }: Props) {
  const isAssistant = message.role === "assistant";

  return (
    <article className={`chat-bubble ${message.role}`}>
      <div className="bubble-content">
        {message.content.split("\n\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {isAssistant && (
        <>
          <div className="assistant-meta">
            <span>Confidence {Math.round((message.confidence ?? 0.88) * 100)}%</span>
            <div>
              <button aria-label="Copy answer">
                <Clipboard size={15} />
              </button>
              <button aria-label="Regenerate answer">
                <RefreshCw size={15} />
              </button>
              <button aria-label="Helpful">
                <ThumbsUp size={15} />
              </button>
              <button aria-label="Not helpful">
                <ThumbsDown size={15} />
              </button>
            </div>
          </div>
          <div className="inline-sources">
            {message.sources?.map((source) => (
              <SourceCard key={source.id} source={source} compact />
            ))}
          </div>
        </>
      )}
    </article>
  );
}
