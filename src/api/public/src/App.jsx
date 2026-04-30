import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: `Generate a Suno prompt for: ${prompt}` }]
        })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "Error");
    } catch { setResult("Error"); }
    setLoading(false);
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", padding: "40px", fontFamily: "monospace" }}>
      <h1 style={{ color: "#c8a96e" }}>Hooksmith</h1>
      <p style={{ color: "#666" }}>Write. Shape. Release.</p>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe your song..." rows={4} style={{ width: "100%", background: "#111", color: "#ccc", border: "1px solid #333", padding: "12px", marginTop: "20px", fontSize: "14px" }} />
      <button onClick={generate} disabled={loading} style={{ marginTop: "12px", padding: "12px 28px", background: "#c8a96e", border: "none", color: "#000", cursor: "pointer", fontSize: "14px" }}>
        {loading ? "Generating..." : "Generate Suno Prompt"}
      </button>
      {result && <pre style={{ marginTop: "24px", background: "#111", padding: "16px", color: "#d4c4a0", whiteSpace: "pre-wrap" }}>{result}</pre>}
    </div>
  );
}
