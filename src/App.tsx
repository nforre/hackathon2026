import { useState } from "react";
import FeedTab from "./tabs/FeedTab";
import ExploreTab from "./tabs/ExploreTab";
import NotificationsTab from "./tabs/NotificationsTab";
import MessagesTab from "./tabs/MessagesTab";
import ProfileTab from "./tabs/ProfileTab";

type Tab = "feed" | "explore" | "notifications" | "messages" | "profile";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "feed", label: "Feed", icon: "home" },
    { id: "explore", label: "Explore", icon: "search" },
    { id: "notifications", label: "OOTD", icon: "bell" },
    { id: "messages", label: "Messages", icon: "message" },
    { id: "profile", label: "Profile", icon: "user" },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0"
        style={{ borderBottom: "1px solid var(--color-border)" }}>
        <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-serif)", color: "#FF88B0", border: "1px solid #000" }}>
          ootd.
        </span>
        <button className="w-9 h-9 rounded-full overflow-hidden border-2"
          style={{ borderColor: "var(--color-accent)" }}>
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format"
            alt="Your avatar" className="w-full h-full object-cover" />
        </button>
      </header>

      {/* Content area */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "feed" && <FeedTab />}
        {activeTab === "explore" && <ExploreTab />}
        {activeTab === "notifications" && <NotificationsTab />}
        {activeTab === "messages" && <MessagesTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>

      {/* Bottom nav */}
      <nav className="shrink-0 flex items-center justify-around px-4 py-2 pb-safe"
        style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-200"
            style={{
              color: activeTab === tab.id ? "var(--color-accent)" : "var(--color-text-muted)",
              background: activeTab === tab.id ? "rgba(139, 92, 246, 0.12)" : "transparent",
            }}
          >
            <TabIcon name={tab.icon} active={activeTab === tab.id} />
            <span className="text-[10px] font-semibold tracking-wide">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function TabIcon({ name, active }: { name: string; active: boolean }) {
  const size = 22;
  const stroke = active ? "var(--color-accent)" : "var(--color-text-muted)";
  const sw = active ? 2.2 : 1.8;
  if (name === "home") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
  if (name === "search") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
  if (name === "bell") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
  if (name === "message") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
  if (name === "user") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
  return null;
}
