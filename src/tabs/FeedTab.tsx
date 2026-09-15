import { useState } from "react";

interface Post {
  id: number;
  user: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  shared: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1, user: "Maya Chen", handle: "@mayachen", time: "2m ago",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format",
    content: "Golden hour in Kyoto never disappoints. Three weeks into this trip and every sunset still takes my breath away. 🌅",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=360&fit=crop&auto=format",
    likes: 1284, comments: 47, shares: 89, liked: false, shared: false,
  },
  {
    id: 2, user: "Rohan Mehta", handle: "@rohanmehta", time: "18m ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    content: "Just shipped v2.0 of my open-source project after 6 months of work. 847 commits, 12 contributors, and countless late nights — totally worth it. Check the link in bio!",
    likes: 672, comments: 118, shares: 204, liked: false, shared: false,
  },
  {
    id: 3, user: "Sofia Reyes", handle: "@sofiareyes", time: "1h ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
    content: "Morning run along the coast. 8km in 42 minutes — new personal best! The sea air is something else.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=380&fit=crop&auto=format",
    likes: 398, comments: 33, shares: 15, liked: true, shared: false,
  },
  {
    id: 4, user: "James Okafor", handle: "@jamesokafor", time: "3h ago",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format",
    content: "Hot take: the best productivity tool is still a blank notebook and a good pen. Fight me.",
    likes: 2104, comments: 287, shares: 562, liked: false, shared: false,
  },
];

export default function FeedTab() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [commentInput, setCommentInput] = useState<{ [id: number]: string }>({});
  const [openComment, setOpenComment] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setPosts(p => p.map(post =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleShare = (id: number) => {
    setPosts(p => p.map(post =>
      post.id === id
        ? { ...post, shared: !post.shared, shares: post.shared ? post.shares - 1 : post.shares + 1 }
        : post
    ));
  };

  const submitComment = (id: number) => {
    const text = commentInput[id]?.trim();
    if (!text) return;
    setPosts(p => p.map(post =>
      post.id === id ? { ...post, comments: post.comments + 1 } : post
    ));
    setCommentInput(c => ({ ...c, [id]: "" }));
    setOpenComment(null);
  };

  return (
    <div className="flex flex-col gap-0">
      {posts.map((post) => (
        <article key={post.id} className="flex flex-col"
          style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="flex items-start gap-3 px-4 pt-4">
            <img src={post.avatar} alt={post.user}
              className="w-10 h-10 rounded-full object-cover shrink-0 ring-2"
              style={{ ringColor: "var(--color-border)" }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{post.user}</span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{post.handle}</span>
                <span className="text-xs ml-auto shrink-0" style={{ color: "var(--color-text-muted)" }}>{post.time}</span>
              </div>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--color-text)" }}>{post.content}</p>
            </div>
          </div>


          {post.image && (
            <div className="mt-3 mx-4 rounded-2xl overflow-hidden"
              style={{ background: "var(--color-muted)" }}>
              <img src={post.image} alt="Post media" className="w-full object-cover max-h-56" />
            </div>
          )}

          <div className="flex items-center gap-1 px-4 py-3">
            <ActionBtn
              onClick={() => toggleLike(post.id)}
              active={post.liked}
              activeColor="var(--color-like)"
              label={fmt(post.likes)}
              icon={<HeartIcon filled={post.liked} />}
            />
            <ActionBtn
              onClick={() => setOpenComment(openComment === post.id ? null : post.id)}
              active={openComment === post.id}
              activeColor="var(--color-comment)"
              label={fmt(post.comments)}
              icon={<CommentIcon />}
            />
            <ActionBtn
              onClick={() => toggleShare(post.id)}
              active={post.shared}
              activeColor="var(--color-share)"
              label={fmt(post.shares)}
              icon={<ShareIcon filled={post.shared} />}
            />
          </div>

          {openComment === post.id && (
            <div className="flex items-center gap-2 px-4 pb-4">
              <input
                value={commentInput[post.id] || ""}
                onChange={e => setCommentInput(c => ({ ...c, [post.id]: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && submitComment(post.id)}
                placeholder="Write a comment…"
                className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
                style={{
                  background: "var(--color-muted)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                }}
                autoFocus
              />
              <button onClick={() => submitComment(post.id)}
                className="px-3 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ background: "var(--color-accent)", color: "#fff" }}>
                Post
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function fmt(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return String(n);
}

function ActionBtn({ onClick, active, activeColor, label, icon }: {
  onClick: () => void; active: boolean; activeColor: string; label: string; icon: React.ReactNode;
}) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 hover:opacity-80"
      style={{
        color: active ? activeColor : "var(--color-text-muted)",
        background: active ? `color-mix(in srgb, ${activeColor} 14%, transparent)` : "transparent",
      }}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon({ filled }: { filled: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
