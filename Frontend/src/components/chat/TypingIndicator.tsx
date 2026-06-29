export function TypingIndicator() {
  return (
    <div className="typing-card" aria-label="Assistant is thinking">
      <div className="typing-dots">
        <span />
        <span />
        <span />
      </div>
      <div>
        <strong>Formatting response</strong>
        <p>Preparing cited answer with page-level references.</p>
      </div>
    </div>
  );
}
