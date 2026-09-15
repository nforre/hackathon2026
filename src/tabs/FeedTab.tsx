import { useState } from "react";

import { initialPosts, matchesPost, matchesCategory, getPostTags, type Post } from "../posts";

export default function FeedTab({ onTagSearch, search = "", category = "All" }: { onTagSearch: (tag: string) => void; search?: string; category?: string }) {
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
      {posts.filter(post => matchesPost(post, search) && matchesCategory(post, category)).map((post) => (
        <article key={post.id} className="flex flex-col"
          style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="flex items-start gap-3 px-4 pt-4">
            <img src={post.avatar} alt={post.user}
              className="w-10 h-10 rounded-full object-cover shrink-0"
              style={{ boxShadow: "0 0 0 2px var(--color-border)" }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{post.user}</span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{post.handle}</span>
                <span className="text-xs ml-auto shrink-0" style={{ color: "var(--color-text-muted)" }}>{post.time}</span>
              </div>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--color-text)" }}>{post.content}</p>
            </div>
          </div>


          <div className="flex flex-wrap gap-2 px-4 pt-2">
            {getPostTags(post).map(tag => <button key={tag} onClick={() => onTagSearch(tag)} className="text-xs font-medium hover:underline" style={{ color: "var(--color-accent)" }}>{tag}</button>)}
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
