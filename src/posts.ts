export interface Post {
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
  tags?: string[];
}

export const initialPosts: Post[] = [
  {
    id: 1, user: "Maya Chen", handle: "@mayachen", time: "2m ago",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format",
    content: "Drip too hard I need a coaster!",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=360&fit=crop&auto=format",
    likes: 1284, comments: 47, shares: 89, liked: false, shared: false, tags: ["#fashion", "#style", "#ootd"],
  },
  {
    id: 2, user: "Rohan Mehta", handle: "@rohanmehta", time: "18m ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    content: "My beautiful new sundress from the local market! Can not wait to wear it to the summer festival next week.",
    likes: 672, comments: 118, shares: 204, liked: false, shared: false, tags: ["#fashion", "#summer", "#festival"],
  },
  {
    id: 3, user: "Sofia Reyes", handle: "@sofiareyes", time: "1h ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
    content: "Love this vintage coat! Found it at a thrift store and it fits perfectly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=380&fit=crop&auto=format",
    likes: 398, comments: 33, shares: 15, liked: true, shared: false, tags: ["#vintage", "#thriftfinds", "#fashion"],
  },
  {
    id: 4, user: "James Okafor", handle: "@jamesokafor", time: "3h ago",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format",
    content: "Ok it's giving office siren...",
    likes: 2104, comments: 287, shares: 562, liked: false, shared: false, tags: ["#office", "#minimalism"],
  },
];


export interface SearchablePost {
  user: string;
  handle?: string;
  content?: string;
  cat?: string;
  tags?: string[];
}

export function normalizeTag(tag: string) {
  return tag.trim().replace(/^#+/, "").toLowerCase();
}

export function getPostTags(post: SearchablePost): string[] {
  const inlineTags = post.content?.match(/#[\p{L}\p{N}_-]+/gu) ?? [];
  return [...new Set([...(post.tags ?? []), ...inlineTags, ...(post.cat ? [post.cat] : [])]
    .map(normalizeTag).filter(Boolean))].map(tag => "#" + tag);
}

export function matchesCategory(post: SearchablePost, category: string) {
  return category === "All" || getPostTags(post).some(tag => normalizeTag(tag) === normalizeTag(category));
}

export function matchesPost(post: SearchablePost, search: string) {
  const query = search.trim().toLowerCase();
  const tagQuery = normalizeTag(query);
  return !query || Boolean(tagQuery && getPostTags(post).some(tag => normalizeTag(tag).includes(tagQuery))) ||
    (!query.startsWith("#") && [post.user, post.handle, post.content, post.cat].filter(Boolean).join(" ").toLowerCase().includes(query));
}
