import { useState } from "react";

interface Message {
  id: number;
  user: string;
  avatar: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
  messages: { from: "me" | "them"; text: string; time: string }[];
}

const conversations: Message[] = [
  {
    id: 1, user: "Maya Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format",
    preview: "That Kyoto trip sounds amazing!", time: "2m", unread: 3, online: true,
    messages: [
      { from: "them", text: "Hey! Just saw your post from Kyoto 😍", time: "10:30" },
      { from: "me", text: "Yes! It's been absolutely surreal here", time: "10:32" },
      { from: "them", text: "That Kyoto trip sounds amazing!", time: "10:35" },
    ],
  },
  {
    id: 2, user: "Rohan Mehta", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    preview: "Can you review my PR when you get a chance?", time: "1h", unread: 1, online: true,
    messages: [
      { from: "them", text: "Hey, shipped the new feature today!", time: "09:15" },
      { from: "me", text: "Nice! I saw the announcement. Congrats 🎉", time: "09:20" },
      { from: "them", text: "Can you review my PR when you get a chance?", time: "09:45" },
    ],
  },
  {
    id: 3, user: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
    preview: "New PB! 8km done 💪", time: "3h", unread: 0, online: false,
    messages: [
      { from: "me", text: "Your morning runs are so inspiring!", time: "07:00" },
      { from: "them", text: "New PB! 8km done 💪", time: "07:45" },
    ],
  },
  {
    id: 4, user: "James Okafor", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format",
    preview: "Hahaha okay fair point", time: "Yesterday", unread: 0, online: false,
    messages: [
      { from: "me", text: "Okay I actually agree with the notebook take", time: "Yesterday" },
      { from: "them", text: "Hahaha okay fair point", time: "Yesterday" },
    ],
  },
];

export default function MessagesTab() {
  const [open, setOpen] = useState<Message | null>(null);
  const [input, setInput] = useState("");
  const [convos, setConvos] = useState<Message[]>(conversations);

  const sendMessage = () => {
    if (!input.trim() || !open) return;
    const newMsg = { from: "me" as const, text: input.trim(), time: "now" };
    setConvos(prev => prev.map(c =>
      c.id === open.id ? { ...c, messages: [...c.messages, newMsg], preview: newMsg.text } : c
    ));
    setOpen(prev => prev ? { ...prev, messages: [...prev.messages, newMsg] } : prev);
    setInput("");
  };

  if (open) {
    const conv = convos.find(c => c.id === open.id)!;
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-4 py-3 shrink-0"
          style={{ borderBottom: "1px solid var(--color-border)" }}>
          <button onClick={() => setOpen(null)} className="text-lg hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-text-muted)" }}>←</button>
          <img src={conv.avatar} alt={conv.user} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <div className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{conv.user}</div>
            {conv.online && <div className="text-xs" style={{ color: "#22c55e" }}>Online</div>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {conv.messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm"
                style={{
                  background: m.from === "me" ? "var(--color-accent)" : "var(--color-surface)",
                  color: m.from === "me" ? "#fff" : "var(--color-text)",
                  borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  border: m.from === "them" ? "1px solid var(--color-border)" : "none",
                }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-3 shrink-0"
          style={{ borderTop: "1px solid var(--color-border)" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Message…"
            className="flex-1 px-4 py-2.5 rounded-2xl text-sm outline-none"
            style={{ background: "var(--color-surface)", color: "var(--color-text)", border: "1px solid var(--color-border)" }}
          />
          <button onClick={sendMessage}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: "var(--color-accent)" }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 pt-4 pb-3">
        <h2 className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>Messages</h2>
      </div>
      {convos.map(c => (
        <button key={c.id}
          onClick={() => { setOpen(c); setConvos(prev => prev.map(x => x.id === c.id ? { ...x, unread: 0 } : x)); }}
          className="flex items-center gap-3 px-4 py-3.5 w-full text-left transition-colors hover:bg-white/5"
          style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="relative shrink-0">
            <img src={c.avatar} alt={c.user} className="w-11 h-11 rounded-full object-cover" />
            {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
              style={{ background: "#22c55e", borderColor: "var(--color-bg)" }} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{c.user}</span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{c.time}</span>
            </div>
            <p className="text-xs truncate mt-0.5" style={{ color: "var(--color-text-muted)" }}>{c.preview}</p>
          </div>
          {c.unread > 0 && (
            <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: "var(--color-accent)", color: "#fff" }}>{c.unread}</span>
          )}
        </button>
      ))}
    </div>
  );
}
