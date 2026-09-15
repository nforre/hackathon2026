import { useState } from "react";

const userPosts = [
  { id: 1, img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&h=300&fit=crop&auto=format", likes: "1.2k" },
  { id: 2, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&auto=format", likes: "847" },
  { id: 3, img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop&auto=format", likes: "2.3k" },
  { id: 4, img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop&auto=format", likes: "512" },
  { id: 5, img: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=300&h=300&fit=crop&auto=format", likes: "3.1k" },
  { id: 6, img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=300&fit=crop&auto=format", likes: "1.8k" },
];

export default function ProfileTab() {
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState<"posts" | "liked">("posts");

  return (
    <div className="flex flex-col pb-6">

      {/* Avatar + action */}
      <div className="flex items-center justify-between px-4 mt-4 mb-3">
        <div className="w-20 h-20 rounded-full border-4 overflow-hidden shrink-0"
          style={{ borderColor: "var(--color-bg)", background: "var(--color-muted)" }}>
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&auto=format"
            alt="Your profile" className="w-full h-full object-cover" />
        </div>
        <button
          onClick={() => setFollowing(f => !f)}
          className="px-5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-80"
          style={{
            height: "60px",
            background: following ? "transparent" : "#FF88B0",
            color: following ? "var(--color-text)" : "#fff",
            border: `1.5px solid ${following ? "var(--color-border)" : "transparent"}`,
          }}>
          {following ? "Following" : "Follow"}
        </button>
      </div>

      {/* Bio */}
      <div className="px-4 mb-4">
        <h2 className="font-bold text-base" style={{ color: "var(--color-text)" }}>Lorum Ipsum</h2>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>@lorumipsum</p>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-text)" }}>
          Photographer & traveler. Chasing light in all the right places. Based in San Francisco ✦ Everywhere else.
        </p>
        <div className="flex gap-1 items-center mt-1.5">
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Somewhere, Earth</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-0 px-4 mb-4">
        {[
          { label: "Posts", val: "247" },
          { label: "Followers", val: "28.4k" },
          { label: "Following", val: "412" },
        ].map((s, i) => (
          <div key={i} className={`flex-1 text-center ${i > 0 ? "border-l" : ""}`}
            style={{ borderColor: "var(--color-border)" }}>
            <div className="font-bold text-base" style={{ color: "var(--color-text)" }}>{s.val}</div>
            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b mb-1" style={{ borderColor: "var(--color-border)" }}>
        {(["posts", "liked"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2.5 text-xs font-semibold capitalize transition-colors"
            style={{
              color: tab === t ? "var(--color-accent)" : "var(--color-text-muted)",
              borderBottom: tab === t ? "2px solid var(--color-accent)" : "2px solid transparent",
            }}>
            {t === "posts" ? "Posts" : "Liked"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5 px-0.5">
        {userPosts.map(p => (
          <div key={p.id} className="relative aspect-square overflow-hidden group cursor-pointer"
            style={{ background: "var(--color-muted)" }}>
            <img src={p.img} alt="Post" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(0,0,0,0.45)" }}>
              <span className="text-white text-sm font-semibold">♥ {p.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
