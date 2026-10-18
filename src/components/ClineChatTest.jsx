import { useState, useEffect, useRef } from "react";
import {
  isClineConfigured,
  clineChat,
  clineChatStream,
} from "../services/cline";

export default function ClineChatTest() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [responseModel, setResponseModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streaming, setStreaming] = useState("");
  const messagesRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError(null);
    setLoading(true);

    try {
      // Non-streaming call
      const { content, model } = await clineChat(input, {
        model: import.meta.env.VITE_CLINEC_MODEL,
        stream: false,
        systemMessage: "You are a helpful assistant for bskcoding.com.",
      });
      setResponse(content);
      setResponseModel(model);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStream = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError(null);
    setLoading(true);
    setStreaming("");

    try {
      await clineChatStream(
        input,
        (chunk) => {
          setStreaming((prev) => prev + chunk);
          // Auto-scroll
          if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
          }
        },
        {
          model: import.meta.env.VITE_CLINEC_MODEL,
          systemMessage: "You are a helpful assistant for bskcoding.com.",
        },
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isClineConfigured()) {
    return (
      <div style={{ padding: "20px", border: "2px solid #ef4444", background: "#fef2f2" }}>
        <h3>⚠️ Cline API not configured</h3>
        <p>
          Add your Cline API key to <code>.env</code>:<br />
          <code>VITE_CLINEC_API_KEY=sk_your_key_here</code><br />
          Then restart the dev server.
        </p>
        <p>
          Get your key at{" "}
          <a href="https://app.cline.bot" target="_blank" rel="noopener noreferrer">
            app.cline.bot → Settings → API Keys
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2>Cline API Chat Test</h2>
      <p>
        Model: <code>{import.meta.env.VITE_CLINEC_MODEL}</code>
      </p>

      <form onSubmit={handleSend} style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{ flex: 1, padding: "8px 12px", fontSize: "14px" }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Sending..." : "Send (non-stream)"}
        </button>
      </form>

      <form onSubmit={handleStream} style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something (streaming)..."
          style={{ flex: 1, padding: "8px 12px", fontSize: "14px" }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Streaming..." : "Stream"}
        </button>
      </form>

      {error && (
        <div style={{ color: "#dc2626", background: "#fef2f2", padding: "12px", borderRadius: "6px", marginBottom: "12px" }}>
          Error: {error}
        </div>
      )}

      {streaming && (
        <div ref={messagesRef} style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", maxHeight: "300px", overflowY: "auto", marginBottom: "12px" }}>
          <strong>Assistant (stream):</strong><br />
          {streaming}
        </div>
      )}

      {response && (
        <div style={{ background: "#f0fdf4", padding: "12px", borderRadius: "6px" }}>
          <strong>Assistant ({responseModel}):</strong><br />
          {response}
        </div>
      )}
    </div>
  );
}