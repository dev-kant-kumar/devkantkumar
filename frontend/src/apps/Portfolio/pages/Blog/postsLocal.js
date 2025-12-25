// Auto-load local post components from Posts/*.jsx
export const localPosts = (() => {
  const modules = import.meta.glob('./Posts/*.jsx', { eager: true });
  const posts = Object.values(modules)
    .map((m) => {
      const Component = m?.default;
      const info = Component?.info || m?.info;
      return Component && info ? { Component, meta: info } : null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.meta.publishDate) - new Date(a.meta.publishDate));
  return posts;
})();

export const localPostMetas = localPosts.map((p) => p.meta);

export const getPostBySlug = (slug) => localPosts.find((p) => p.meta.slug === slug);
