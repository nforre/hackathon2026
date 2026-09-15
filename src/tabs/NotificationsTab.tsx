import { useState, useEffect } from "react";

interface OOTDPost {
  id: number;
  user: string;
  handle: string;
  avatar: string;
  image: string;
  caption: string;
  time: string;
  likes: number;
  liked: boolean;
}

const communityPosts: OOTDPost[] = [
  {
    id: 1, user: "Maya Chen", handle: "@mayachen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop&auto=format",
    caption: "Monochrome moment ✦ all black everything today",
    time: "3h ago", likes: 284, liked: false,
  },
  {
    id: 2, user: "Sofia Reyes", handle: "@sofiareyes",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=750&fit=crop&auto=format",
    caption: "Sunday soft launch 🤍 linen & loafers",
    time: "5h ago", likes: 512, liked: false,
  },
  {
    id: 3, user: "Lena Park", handle: "@lenapark",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=750&fit=crop&auto=format",
    caption: "Vintage find from the market + thrifted boots 🍂",
    time: "7h ago", likes: 739, liked: true,
  },
];

const TODAY_KEY = "ootd_posted_date";
const POST_KEY = "ootd_post_data";

function getTodayStr() {
  return new Date().toDateString();
}

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m`;
}

export default function NotificationsTab() {
  const [hasPostedToday, setHasPostedToday] = useState(() => {
    return localStorage.getItem(TODAY_KEY) === getTodayStr();
  });
  const [myPost, setMyPost] = useState<{ image: string; caption: string } | null>(() => {
    const saved = localStorage.getItem(POST_KEY);
    if (saved && localStorage.getItem(TODAY_KEY) === getTodayStr()) {
      return JSON.parse(saved);
    }
    return null;
  });
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [posts, setPosts] = useState<OOTDPost[]>(communityPosts);
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    if (!hasPostedToday) return;
    const t = setInterval(() => setCountdown(getTimeUntilMidnight()), 60000);
    return () => clearInterval(t);
  }, [hasPostedToday]);

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handlePost = () => {
    if (!previewUrl) return;
    const data = { image: previewUrl, caption };
    localStorage.setItem(TODAY_KEY, getTodayStr());
    localStorage.setItem(POST_KEY, JSON.stringify(data));
    setMyPost(data);
    setHasPostedToday(true);
  };

  const toggleLike = (id: number) => {
    setPosts(p => p.map(post =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="flex flex-col pb-6">
      {/* My OOTD section */}
      {hasPostedToday && myPost ? (
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--color-border)", background: "var(--color-card)" }}>
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid var(--color-border)" }}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "var(--color-accent)" }}>Your OOTD</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(255,136,176,0.12)", color: "var(--color-accent)" }}>
                Today
              </span>
            </div>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Next post in {countdown}
            </span>
          </div>
          <img src={myPost.image} alt="Your OOTD" className="w-full object-cover max-h-80" />
          {myPost.caption && (
            <p className="px-4 py-3 text-sm" style={{ color: "var(--color-text)" }}>{myPost.caption}</p>
          )}
        </div>
      ) : (
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--color-border)", background: "var(--color-card)" }}>
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: "var(--color-accent)" }}>Today's OOTD</p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Share your outfit — one post per day ✦
            </p>
          </div>

          {/* Image picker */}
          <label className="mx-4 mb-3 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-colors"
            style={{
              height: previewUrl ? "auto" : "160px",
              border: `2px dashed ${previewUrl ? "transparent" : "var(--color-border)"}`,
              background: previewUrl ? "transparent" : "var(--color-muted)",
            }}>
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-full rounded-xl object-cover max-h-72" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,136,176,0.15)" }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Tap to add photo</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
          </label>

          <div className="px-4 pb-4 flex flex-col gap-3">
            <input
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Describe your fit…"
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: "var(--color-muted)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            />
            <button
              onClick={handlePost}
              disabled={!previewUrl}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: previewUrl ? "var(--color-accent)" : "var(--color-muted)",
                color: previewUrl ? "#fff" : "var(--color-text-muted)",
                cursor: previewUrl ? "pointer" : "not-allowed",
              }}>
              Post OOTD
            </button>
          </div>
        </div>
      )}

      {/* Community feed */}
      <div className="px-4 mt-5 mb-3 flex items-center gap-2">
        <span className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "var(--color-text-muted)" }}>Today's fits</span>
        <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
      </div>

      <div className="flex flex-col gap-4 px-4">
        {posts.map(post => (
          <div key={post.id} className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--color-border)", background: "var(--color-card)" }}>
            <div className="flex items-center gap-3 px-3 py-3">
              <img src={post.avatar} alt={post.user}
                className="w-8 h-8 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-xs" style={{ color: "var(--color-text)" }}>{post.user}</span>
                <span className="text-xs ml-1.5" style={{ color: "var(--color-text-muted)" }}>{post.handle}</span>
              </div>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{post.time}</span>
            </div>
            <img src={post.image} alt={`${post.user}'s OOTD`} className="w-full object-cover max-h-72" />
            <div className="px-3 py-3 flex items-center justify-between">
              <p className="text-xs flex-1 mr-3" style={{ color: "var(--color-text-muted)" }}>{post.caption}</p>
              <button onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{
                  color: post.liked ? "var(--color-like)" : "var(--color-text-muted)",
                  background: post.liked ? "rgba(244,63,94,0.12)" : "transparent",
                }}>
                <svg width={14} height={14} viewBox="0 0 24 24"
                  fill={post.liked ? "currentColor" : "none"}
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {post.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
