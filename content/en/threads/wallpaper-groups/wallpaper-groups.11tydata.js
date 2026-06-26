export default {
  layout: "thread-post.njk",
  lang: "en",
  threadName: "wallpaper-groups",
  permalink: function(data) {
    // Remove number prefix from filename for URL
    const slug = data.page.fileSlug.replace(/^\d+-/, '');
    return `/wallpaper-groups/${slug}/`;
  }
};
