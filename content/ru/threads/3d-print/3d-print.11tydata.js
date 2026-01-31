export default {
  layout: "thread-post.njk",
  lang: "ru",
  threadName: "3d-print",
  permalink: function(data) {
    // Remove number prefix from filename for URL
    const slug = data.page.fileSlug.replace(/^\d+-/, '');
    return `/ru/threads/3d-print/${slug}/`;
  }
};
