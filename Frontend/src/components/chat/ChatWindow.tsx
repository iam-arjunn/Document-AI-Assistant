import type { ChatMessage } from "../../types";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";

type Props = {
  messages: ChatMessage[];
};

export function ChatWindow({ messages }: Props) {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div>
          <p className="eyebrow">Ask across indexed documents</p>
          <h2>Conversation</h2>
        </div>
        <div className="progress-copy">
          <span>Searching documents...</span>
          <span>Retrieving relevant chunks...</span>
          <span>Generating answer...</span>
        </div>
      </div>
      <div className="message-list">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <TypingIndicator />
      </div>
    </div>
  );
}
