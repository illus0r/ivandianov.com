// const Image = require("@11ty/eleventy-img");
import CleanCSS from "clean-css";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
// import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"; // Disabled - using ImageKit CDN
// for classes in md
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItBracketedSpans from "markdown-it-bracketed-spans";
import markdownItContainer from "markdown-it-container";
import jsdom from "jsdom";
import fs from "fs";

// Автоматическая генерация коллекций для тредов
function setupThreadCollections(eleventyConfig) {
  const langs = ['ru', 'en'];
  
  langs.forEach(lang => {
    const threadsDir = `content/${lang}/threads`;
    
    if (!fs.existsSync(threadsDir)) return;
    
    const threadDirs = fs.readdirSync(threadsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
    
    threadDirs.forEach(threadName => {
      const collectionName = lang === 'en' 
        ? `thread${capitalize(threadName)}En`
        : `thread${capitalize(threadName)}`;
      
      eleventyConfig.addCollection(collectionName, function (api) {
        return api.getFilteredByGlob(`content/${lang}/threads/${threadName}/*.md`)
          .sort((a, b) => {
            // Обратная сортировка: большие номера сверху (свежие посты первые)
            const aNum = parseInt(a.filePathStem.match(/(\d+)-/)?.[1] || 0);
            const bNum = parseInt(b.filePathStem.match(/(\d+)-/)?.[1] || 0);
            return bNum - aNum;
          });
      });
    });
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Markdown-it plugin: :::glsl ... ::: → <canvas data-glsl="...">
// Токены после "glsl": classic, editor, collapsed — служебные; остальное → CSS класс
function glslPlugin(md) {
  md.block.ruler.before('fence', 'glsl_preview', (state, startLine, endLine, silent) => {
    const lineText = state.src.slice(
      state.bMarks[startLine] + state.tShift[startLine],
      state.eMarks[startLine]
    ).trim();
    if (!/^:::?\s*glsl/.test(lineText)) return false;
    if (silent) return true;
    let nextLine = startLine + 1;
    while (nextLine < endLine) {
      const text = state.src.slice(
        state.bMarks[nextLine] + state.tShift[nextLine],
        state.eMarks[nextLine]
      ).trim();
      if (text === ':::') break;
      nextLine++;
    }
    const lines = [];
    for (let i = startLine + 1; i < nextLine; i++) {
      lines.push(state.src.slice(state.bMarks[i], state.eMarks[i]));
    }
    const rest = lineText.replace(/^:::?\s*glsl\s*/, '').trim();
    const tokens = rest ? rest.split(/\s+/) : [];
    const KNOWN = new Set(['classic', 'editor', 'collapsed']);
    const mode = tokens.includes('classic') ? 'classic300' : 'geekest300';
    const editorState = tokens.includes('collapsed') ? 'collapsed'
                      : tokens.includes('editor')    ? 'open'
                      : '';
    const extraClass = tokens.filter(t => !KNOWN.has(t)).join(' ');

    const token = state.push('glsl_canvas', 'div', 0);
    token.content = lines.join('\n');
    token.attrSet('data-mode', mode);
    if (editorState) token.attrSet('data-editor', editorState);
    if (extraClass) token.attrSet('data-class', extraClass);
    token.map = [startLine, nextLine];
    state.line = nextLine + 1;
    return true;
  });
  md.renderer.rules.glsl_canvas = (tokens, idx) => {
    const token = tokens[idx];
    const rawCode = token.content;
    const escapedCode = md.utils.escapeHtml(rawCode).replace(/"/g, '&quot;');
    const mode = token.attrGet('data-mode') || 'geekest300';
    const editorState = token.attrGet('data-editor') || '';
    const extraClass = token.attrGet('data-class') || '';
    const cls = extraClass ? ` ${extraClass}` : '';
    const editorAttr = editorState ? ` data-editor="${editorState}"` : '';

    const canvasHtml = editorState
      ? `<div class="glsl-canvas-wrap"><canvas class="glsl-canvas" data-glsl="${escapedCode}"></canvas><button class="glsl-editor-toggle">${editorState === 'collapsed' ? 'show code' : 'hide code'}</button></div>`
      : `<canvas class="glsl-canvas" data-glsl="${escapedCode}"></canvas>`;
    const editorWrapHtml = editorState
      ? `<div class="glsl-editor-wrap"${editorState === 'collapsed' ? ' style="display:none"' : ''}><pre class="glsl-editor-pre"><code class="language-glsl glsl-code">${rawCode.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</code></pre><pre class="glsl-errors" style="display:none"></pre></div>`
      : '';
    return `<div class="glsl-preview${cls}" data-mode="${mode}"${editorAttr}>${canvasHtml}${editorWrapHtml}</div>\n`;
  };
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.ignores.add("_docs/**/*");
  eleventyConfig.addPassthroughCopy({
    "assets/media/**/*.mp4": "assets/media",
    "assets/js/**/*.js": "assets/js",
    "assets/fonts/*": "assets/fonts",
  });
  eleventyConfig.addPassthroughCopy("assets/threads");

  // Disabled - using ImageKit CDN instead
  // eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
  //   urlPath: "/assets/media",
  //   formats: ["webp"],
  //   sharpOptions: { webp: { quality: 100 } },
  //   widths: ["512", "1024", "2048"],
  //   htmlOptions: {
  //     imgAttributes: { loading: "lazy", decoding: "async" },
  //     pictureAttributes: {},
  //   },
  // });

  eleventyConfig.addFilter("dump", function (value) {
    console.log("value:", value);
  });

  eleventyConfig.addFilter("antiLang", function (value) {
    if (value == "ru") return "en";
    return "ru";
  });

  eleventyConfig.addFilter("getTranslationUrl", function (collections, page, targetLang) {
    // Определяем тред по данным страницы, а не по URL
    const pageData = collections.find(p => p.url === page.url);
    const isThreadMicropost = pageData?.data?.threadName &&
                              pageData?.data?.layout === 'thread-post.njk';

    if (isThreadMicropost) {
      const threadName = pageData.data.threadName;
      const urlParts = page.url.split('/').filter(Boolean);
      const slug = urlParts[urlParts.length - 1];
      const targetUrl = targetLang === 'en'
        ? `/${threadName}/${slug}/`
        : `/${targetLang}/${threadName}/${slug}/`;

      const exists = collections.some(p => p.url === targetUrl);
      if (exists) return targetUrl;
      return targetLang === 'en' ? '/' : '/ru/';
    }

    // Обычные страницы — без изменений
    const match = collections.find(p =>
      p.fileSlug === page.fileSlug &&
      p.data.lang === targetLang &&
      p.url !== page.url &&
      p.url && p.url !== false
    );
    return match ? match.url : (targetLang === 'en' ? '/' : '/ru/');
  });

  eleventyConfig.addFilter("lastPart", function (value) {
    if (!value) return "";
    let arr = value.split("/");
    arr.pop();
    return arr.pop();
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("removeNumber", function (slug) {
    return slug.replace(/^\d+-/, '');
  });

  // ImageKit shortcode for CDN images with responsive srcset
  // c-at_max prevents upscaling small images beyond their original size
  eleventyConfig.addShortcode("img", function(url, alt = "", sizes = "auto") {
    const widths = [512, 1024, 2048];
    const srcset = widths
      .map(w => `${url}?tr=w-${w},c-at_max,f-webp ${w}w`)
      .join(", ");
    
    return `<img 
      src="${url}?tr=w-1024,c-at_max,f-webp" 
      srcset="${srcset}"
      sizes="${sizes}"
      alt="${alt}"
      loading="lazy"
      decoding="async"
    >`;
  });

  // ImageKit video shortcode (original quality, no compression)
  eleventyConfig.addShortcode("video", function(url, attrs = "") {
    // Add orig-true to preserve original quality for ImageKit URLs
    const videoUrl = url.includes('ik.imagekit.io') ? `${url}?tr=orig-true` : url;
    return `<video src="${videoUrl}" ${attrs} loop autoplay muted playsinline></video>`;
  });

  eleventyConfig.addCollection("posts", function (collectionsApi) {
    const posts = collectionsApi
      .getAll()
      .filter((item) => {
        return item.data?.tags?.includes("post");
      });
    
    // Для постов-тредов вычисляем дату из последнего поста треда
    posts.forEach(post => {
      if (post.data.threadName) {
        const lang = post.data.lang || 'ru';
        const threadName = post.data.threadName;
        const collectionName = lang === 'en' 
          ? `thread${capitalize(threadName)}En`
          : `thread${capitalize(threadName)}`;
        
        const threadPosts = collectionsApi.getFilteredByGlob(
          `content/${lang}/threads/${threadName}/*.md`
        );
        
        if (threadPosts.length > 0) {
          // Находим максимальную дату среди постов треда
          const maxDate = threadPosts.reduce((max, p) => {
            return p.data.date > max ? p.data.date : max;
          }, threadPosts[0].data.date);
          
          post.data.date = maxDate;
        }
      }
    });
    
    return posts.sort((a, b) => b.data.date - a.data.date);
  });

  eleventyConfig.addCollection("menu", function (collectionsApi) {
    return collectionsApi
      .getAll()
      .filter((item) => {
        return Number.isInteger(Number(item.data.menu));
      })
      .sort((a, b) => Number(a.data.menu) - Number(b.data.menu));
  });

  eleventyConfig.addCollection("projects", function (collectionsApi) {
    return collectionsApi
      .getAll()
      .filter((item) => {
        return item.data?.tags?.includes("projects");
      })
      .sort((a, b) => a.page.fileSlug.localeCompare(b.page.fileSlug));
  });

  // Автоматическая генерация коллекций для всех тредов
  setupThreadCollections(eleventyConfig);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true })
      .use(glslPlugin)
      .use(markdownItBracketedSpans)
      .use(markdownItAttrs)
      .use(markdownItContainer, 'gallery'),
  );

  eleventyConfig.addTransform("danceHeaders", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      const dom = new jsdom.JSDOM(content);
      const document = dom.window.document;

      const headers = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p.big",
      );
      headers.forEach((header) => {
        if (header.innerHTML === header.textContent) {
          let contentArray = header.textContent.split("");
          let newContent = contentArray
            .map((char) => `<span>${char}</span>`)
            .join("");
          header.innerHTML = `<span class="dance-dance">${newContent}</span>`;
        }
      });

      return dom.serialize();
    }

    return content;
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
