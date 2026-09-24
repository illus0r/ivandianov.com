export default {
  layout: "thread-post.njk",
  lang: "en",
  threadName: "random-stuff",
  permalink: function(data) {
    // Remove number prefix from filename for URL
    const slug = data.page.fileSlug.replace(/^\d+-/, '');
    return `/random-stuff/${slug}/`;
  }
};
