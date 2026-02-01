export default {
  layout: "thread-post.njk",
  lang: "ru",
  threadName: "wallpaper-groups",
  permalink: function(data) {
    // Remove number prefix from filename for URL
    const slug = data.page.fileSlug.replace(/^\d+-/, '');
    return `/ru/threads/wallpaper-groups/${slug}/`;
  }
};
