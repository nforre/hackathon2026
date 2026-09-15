import { useState } from "react";

const categories = ["All", "Photography", "Tech", "Art", "Travel", "Food", "Music"];

const posts = [
  { id: 1, user: "Lena Park", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop&auto=format", likes: "4.2k", cat: "Photography" },
  { id: 2, user: "Dev Circle", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop&auto=format", likes: "2.1k", cat: "Tech" },
  { id: 3, user: "Aria Sol", img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop&auto=format", likes: "8.7k", cat: "Art" },
  { id: 4, user: "TrailBlazer", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop&auto=format", likes: "3.5k", cat: "Travel" },
  { id: 5, user: "Chef Riku", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop&auto=format", likes: "1.9k", cat: "Food" },
  { id: 6, user: "Neon Nights", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&auto=format", likes: "6.3k", cat: "Music" },
  { id: 7, user: "Mia Volta", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&auto=format", likes: "5.0k", cat: "Travel" },
  { id: 8, user: "ByteForge", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop&auto=format", likes: "987", cat: "Tech" },
  { id: 9, user: "Celeste", img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300&h=300&fit=crop&auto=format", likes: "2.4k", cat: "Photography" },
];

export default function ExploreTab() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = posts.filter(p =>
    (cat === "All" || p.cat === cat) &&
    (p.user.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
            stroke="var(--color-text-muted)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search creators, topics…"
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: "var(--color-text)" }}
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 overflow-x-auto pb-1">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150"
            style={{
              background: cat === c ? "var(--color-accent)" : "var(--color-surface)",
              color: cat === c ? "#fff" : "var(--color-text-muted)",
              border: `1px solid ${cat === c ? "transparent" : "var(--color-border)"}`,
            }}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-0.5 px-0.5">
        {filtered.map(p => (
          <div key={p.id} className="relative aspect-square overflow-hidden group cursor-pointer"
            style={{ background: "var(--color-muted)" }}>
            <img src={p.img} alt={p.user} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }}>
              <span className="text-white text-xs font-semibold truncate w-full">{p.user}</span>
              <span className="text-white text-xs opacity-80">♥ {p.likes}</span>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12" style={{ color: "var(--color-text-muted)" }}>
          <p className="text-sm">No results found</p>
        </div>
      )}
    </div>
  );
}
